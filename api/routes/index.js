const config = require('../../config'),
    controller = require('../controller/index'),
    //authController = require('../controller/auth'),
    rootPath = config.rootPath;
const { signout, signin, signup, isSignedIn } = require("../controller/auth");
const { check } = require("express-validator");


module.exports = (app) => {
    app.get(`${rootPath}/signout`, signout);

    app.post(`${rootPath}/signup`, [
        check("name").isLength({ min: 3 }).withMessage("Name should be at least 3 characters"),
        check("email").isEmail().withMessage("Email is required"),
        check("password").isLength({ min: 3 }).withMessage("Password should be at least 3 characters")
    ], signup);

    app.post(`${rootPath}/signin`, [
        check("email").isEmail().withMessage("Email is required/invalid"),
        check("password").isLength({ min: 3 }).withMessage("Password is required")
    ], signin);


    app.get(`${rootPath}/getDeployments`, controller.getDeployments);
    app.post(`${rootPath}/postDeployment`, controller.postDeployment);
    app.put(`${rootPath}/updateDeploymentRecord`, controller.updateDeploymentRecord);
    app.delete(`${rootPath}/deleteDeploymentRecord`, controller.deleteDeploymentRecord);
}