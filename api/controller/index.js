let uuidV1 = require('uuid/v1');
let deploymentModel = require('../models/deploymentSchema');
const { response } = require('express');

exports.getDeployments = (req, res) => {
    res.status(200).send('Welcome to getDeployment Route');
    deploymentModel.find()
    .then((response)=>{
        console.log(response);
    })
    .catch((err)=>{
console.log(err);
    })
}

exports.postDeployment = (req, res) => {
    let uuid = uuidV1();
    const payload = req.body;
    
    if(payload){
        let uuid = uuidV1();
        payload.uuid = uuid;

        let deployment = new deploymentModel(payload);
        deployment.save()
            .then((response)=>{
                res.status(201).send('Data Created Successfully!!!');
                console.log('Data Created Successfully!!!');
            })
    }

}