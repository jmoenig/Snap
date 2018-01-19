var SnapCloud = new Cloud(
    'https://snap.apps.miosoft.com/SnapCloudLocal'
    );

Cloud.prototype.overrideUrl = function () {
    this.url = 'https://snap.apps.miosoft.com/SnapCloud';
};

Cloud.prototype.revertUrl = function () {
    this.url = 'https://snap.apps.miosoft.com/SnapCloudLocal';
};

Cloud.prototype.originalSignup = Cloud.prototype.signup;
Cloud.prototype.signup = function (username, email, callBack, errorCall) {
    this.overrideUrl();
    this.originalSignup(username, email, callBack, errorCall);
    this.revertUrl();
};

Cloud.prototype.originalResetPassword = Cloud.prototype.resetPassword;
Cloud.prototype.resetPassword = function (username, callBack, errorCall) {
    this.overrideUrl();
    this.originalResetPassword(username, callBack, errorCall);
    this.revertUrl();
};

Cloud.prototype.originalGetPublicProject = Cloud.prototype.getPublicProject;
Cloud.prototype.getPublicProject = function (id, callBack, errorCall) {
    this.overrideUrl();
    this.originalGetPublicProject(id, callBack, errorCall);
    this.revertUrl();
};

Cloud.prototype.urlForMyProject = function (projectName) {
    if (!this.username) {
        ide.showMessage('You are not logged in:\n' + err);
        throw new Error('You are not logged in:\n' + err);
        return;
    }

    return 'http://snap4arduino.rocks/run#present:Username=' + 
        encodeURIComponent(this.username) + '&ProjectName=' + 
        encodeURIComponent(projectName);
};

