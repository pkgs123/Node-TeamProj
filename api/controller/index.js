let uuidV1 = require('uuid/v1'),
    deploymentModel = require('../models/deploymentSchema');
const { fill } = require('lodash');

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

exports.postDeployment = async (req, res) => {
    debugger;
    let payload = req.body;
    let commonPayload;
    var filArr;
    
    if (payload) {

        if (payload.length > 0) {
            let deplomentObj = deploymentModel.deployments;
            let previousRecord =  await deplomentObj.find()
            .then((response) => {
                console.log(response);
              return response;
            })
            .catch((err) => {
                console.log(err);
            })

            if(previousRecord.length > 0){
            for (let i = 0; i < payload.length; i++) {
                debugger;
                for (let j = 0; j < previousRecord.length; j++) {
                    if (payload[i].Feature === previousRecord[j].Feature) {
                        filArr = payload.slice(i+1);
                    }
                }
            }
        }
            if(filArr === undefined){
                filArr = payload;
            }

            filArr.map((data) => {
                let uuid = uuidV1();
                data.UID = uuid;
            })
            commonPayload = filArr;
            if(commonPayload.length === 0){
                return res.json({message:"Upload Unique Record"})
               // res.status(400).send({message:"Upload Unique Record"});
            }
        }
        else {
            let uuid = uuidV1();
            payload.UID = uuid;
            commonPayload = payload;
        }
       // let deplomentPostObj = deploymentModel.deployments(commonPayload);

        deploymentModel.deployments.insertMany(commonPayload, (err, docs) => {
            if (err) {
                console.log("error", err);
                res.status(400).send(err);

            } else {
                console.log("Multiple documents inserted to Collection");
                res.status(201).send('Data Created Successfully!!!');
                console.log('Data Created Successfully!!!');
            }
        })
        // deplomentPostObj.save()
        //     .then((response) => {
        //         res.status(201).send('Data Created Successfully!!!');
        //         console.log('Data Created Successfully!!!');
        //     })
        //     .catch((err)=>{
        //         console.log("error",err);
        //         res.status(400).send(err);
        //     })
    }

}

exports.updateDeploymentRecord = (req, res) => {

    const data = req.body;

    deploymentModel.deployments.updateOne({ UID: req.body.UID }, { $set: data })
        .then((response) => {
            res.status(200).send('Data Updated Successfully!!!');
        })
        .catch((error) => {
            res.status(400).send('Errro', error);
        })
}

exports.deleteDeploymentRecord = (req, res) => {
    const data = req.body;
    deploymentModel.deployments.deleteOne({ UID: req.body.UID }, { $set: data })
        .then((response) => {
            res.status(200).send('Data Deleted Successfully')
        })
        .catch((error) => {
            res.status(400).send(`Sorry Something wrong!!!${errro}`);
        })
}