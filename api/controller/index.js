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
   
    const payload = req.body;

    if (payload) {
        let uuid = uuidV1();
        payload.UID = uuid;

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

exports.updateDeploymentRecord = (req,res) =>{

    const data = req.body;
  
    deploymentModel.deployments.updateOne({UID:req.body.UID},{$set:data})
    .then((response)=>{
        res.status(200).send('Data Updated Successfully!!!');
    })
    .catch((error)=>{
        res.status(400).send('Errro',error);
    })
}

exports.deleteDeploymentRecord = (req,res) =>{
    const data = req.body;
    deploymentModel.deployments.deleteOne({UID:req.body.UID},{$set:data})
    .then((response)=>{
        res.status(200).send('Data Deleted Successfully')
    })
    .catch((error)=>{
        res.status(400).send(`Sorry Something wrong!!!${errro}`);
    })
}