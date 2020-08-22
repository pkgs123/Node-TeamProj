let uuidV1 = require('uuid/v1'),
    deploymentModel = require('../models/deploymentSchema');

exports.getDeployments = (req, res) => {

    let deplomentObj = deploymentModel.deployments;

    deplomentObj.find()
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.postDeployment = (req, res) => {
    let uuid = uuidV1();
    const payload = req.body;

    if (payload) {
        let uuid = uuidV1();
        payload.uuid = uuid;

        let deplomentPostObj = deploymentModel.deployments(payload);
        deplomentPostObj.save()
            .then((response) => {
                res.status(201).send('Data Created Successfully!!!');
                console.log('Data Created Successfully!!!');
            })
            .catch((err)=>{
                console.log("error",err);
                res.status(400).send(err);
            })
    }

}