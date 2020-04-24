/* globals utils, DEFAULT_SERVICES_HOST, SERVICES_HOSTS, SERVER_URL */
function ServicesRegistry(servicesHosts) {
    this.setServicesHosts(servicesHosts);
}

ServicesRegistry.prototype.reset = function () {
    this.defaultHost = DEFAULT_SERVICES_HOST;
    this.auxServicesHosts = [];
};

ServicesRegistry.prototype.onInvalidHosts = function (invalidHosts) {
    console.error('Invalid services hosts detected:', invalidHosts);
};

ServicesRegistry.prototype.fetchHosts = function () {
    const url = SERVER_URL + '/api/v2/services-hosts/all/';
    return fetch(url)
        .then(response => response.json())
        .then(hosts => this.setServicesHosts(hosts))
        .catch(err => {
            console.error('Unable to fetch hosts: ' + err);
            this.reset();
        });
};

ServicesRegistry.prototype.setServicesHosts = function (hostAndUrls) {
    const defaultIndex = hostAndUrls.findIndex(hostInfo => {
        const {categories} = hostInfo;
        return categories.length === 0;
    });

    if (defaultIndex > -1) {
        this.defaultHost = hostAndUrls.splice(defaultIndex, 1).pop();
    } else if (!this.defaultHost) {
        console.error('No default services host found for', hostAndUrls);
        this.defaultHost = hostAndUrls.splice(0, 1).pop();
    }

    this.auxServicesHosts = hostAndUrls;
    this.validateHosts();
};

ServicesRegistry.prototype.validateHosts = function () {
    const myself = this;
    const invalidHosts = [];
    const requests = this.allHosts().map(hostInfo =>
        fetch(hostInfo.url)
            .then(response => response.json())
            .catch(() => invalidHosts.push(hostInfo))
    );

    Promise.allSettled(requests)
        .then(() => {
            const currentUrls = this.allHosts().map(hostInfo => hostInfo.url);
            const relevantInvalidHosts = invalidHosts
                .filter(hostInfo => currentUrls.includes(hostInfo.url));

            if (relevantInvalidHosts.length) {
                myself.onInvalidHosts(relevantInvalidHosts);
            }
        });
};

ServicesRegistry.prototype.allHosts = function () {
    return [this.defaultHost].concat(this.auxServicesHosts);
};

ServicesRegistry.prototype.getURLForService = function (name) {
    const missingUrls = [];
    const {url} = this.auxServicesHosts.find(hostInfo => {
        const {url} = hostInfo;
        try {
            const serviceNames = JSON.parse(utils.getUrlSync(url))
                .map(service => service.name);
            return serviceNames.includes(name);
        } catch (err) {
            missingUrls.push(url);
        }
    }) || this.defaultHost;

    if (missingUrls.length) {
        const msg = `Could not fetch service metadata from "${missingUrls.join(',')}"`;
        console.error(msg);
    }

    return url;
};

ServicesRegistry.prototype.getServiceMetadata = function (name) {
    const url = this.getURLForService(name) + '/' + name;
    return JSON.parse(utils.getUrlSync(url));
};

ServicesRegistry.prototype.getServicesMetadata = function () {
    var services = this.allHosts().flatMap(hostInfo => {
        const {url, categories} = hostInfo;
        try {
            const services = JSON.parse(utils.getUrlSync(url));
            if (categories.length) {
                services
                    .forEach(service => service.categories.unshift(categories));
            }
            return services;
        } catch (err) {
            console.error(`Unable to fetch services metadata for ${categories}: ${url}`);
            return [];
        }
    });
    return services;
};

/* eslint-disable-next-line no-unused-vars */
const Services = new ServicesRegistry(SERVICES_HOSTS);
