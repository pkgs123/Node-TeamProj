const config = require('../../config'),
      controller = require('../controller/index'),
      rootPath  = config.rootPath;

module.exports = (app) =>{
    app.get(`${rootPath}/getDeployments`,controller.getDeployments);
    app.post(`${rootPath}/postDeployment`,controller.postDeployment);
}