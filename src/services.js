/* globals utils, DEFAULT_SERVICES_HOST, SERVICES_HOSTS, SERVER_URL */
function ServicesRegistry(config, cloud) {
    this.cloud = cloud;
    this.setServicesHosts(config.servicesHosts);
}

ServicesRegistry.prototype.reset = function () {
    this.auxServicesHosts = [];
};

ServicesRegistry.prototype.onInvalidHosts = function (invalidHosts) {
    console.error('Invalid services hosts detected:', invalidHosts);
};

ServicesRegistry.prototype.fetchHosts = function (username) {
    const url = '/services/hosts/all/' + encodeURIComponent(username);

    return this.cloud.fetch(url)
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

ServicesRegistry.prototype.getServiceURL = async function (name) {
    const missingUrls = [];
    const checkingHosts = this.auxServicesHosts.map(async hostInfo => {
        const {url} = hostInfo;
        try {
            const response = await fetch(url);
            const serviceNames = (await response.json())
                .map(service => service.name);
            return serviceNames.includes(name);
        } catch (err) {
            missingUrls.push(url);
        }
    });
    const hostIndex = (await Promise.all(checkingHosts))
        .findIndex(isCorrectHost => isCorrectHost);

    if (missingUrls.length) {
        const msg = `Could not fetch service metadata from "${missingUrls.join(',')}"`;
        console.error(msg);
    }

    const baseUrl = hostIndex > -1 ? this.auxServicesHosts[hostIndex].url :
        this.defaultHost.url;
    return baseUrl + '/' + name;
};

ServicesRegistry.prototype.getServiceMetadataFromURLSync = function (url) {
    return JSON.parse(utils.getUrlSync(url));
};

ServicesRegistry.prototype.getServiceMetadataFromURL = async function (url) {
    const response = await fetch(url);
    return await response.json();
};

ServicesRegistry.prototype.getServiceMetadata = async function (name) {
    const url = await this.getServiceURL(name);
    return this.getServiceMetadataFromURL(url);
};

ServicesRegistry.prototype.getServicesMetadata = async function () {
    var serviceGroups = this.allHosts().map(async hostInfo => {
        const {url, categories} = hostInfo;
        try {
            const response = await fetch(url);
            const services = await response.json();
            if (hostInfo !== this.defaultHost) {
                services.forEach(service => service.url = url);
            }

            if (categories.length) {
                services.forEach(service => {
                    if (service.categories.length === 0) {
                        service.categories.push([]);
                    }
                    service.categories.map(c => c.unshift(categories));
                });
            }
            return services;
        } catch (err) {
            console.error(`Unable to fetch services metadata for ${categories}: ${url}`);
            return [];
        }
    });
    const services = (await Promise.all(serviceGroups)).flat();
    return services;
};

ServicesRegistry.prototype.isRegisteredServiceURL = function (url) {
    return !!this.allHosts().find(host => url.startsWith(host.url));
};
