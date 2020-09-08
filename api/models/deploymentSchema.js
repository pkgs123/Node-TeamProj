const mongoose = require('mongoose'),
 uniqueValidator = require('mongoose-unique-validator');
      Schema = mongoose.Schema;
      
const Deployment = new Schema({
    AppName:{
        type:String,
        required:true,
    },
    AppGroup:{
        type:String
    },
    Feature:{
        type:Number,
        required:true,
        unique:true
    },
    FeatureStatus:{
        type: String,
        required: true
    },
    UserStoryId:{
        type: String,
        required: true
    },
    UserStoryStatus:{
        type: String,
        required: true
    },
    TaskId:{
        type: Number,
        required: true
    },
    TaskIdStatus:{
        type: String,
        required: true
    },
    Functional:{
        type: String,
        required: true
    },
    Developer:{
        type: String,
        required: true
    },
    overAllStatus:{
        type: String,
        required: true
    },
    ReleaseNumber:{
        type: String,
        required: true
    },
    NatureOfChange:{
        type: String,
       // required: true
    },
    UiArtifacts:{
        type: Number,
        required: true
    },
    ApiArtifacts:{
        type: Number,
        required: true
    },
    DevId:{
        type: String
    },
    UID:{
        type: String,
        required:true
    }
})
Deployment.plugin(uniqueValidator);
const deployments = mongoose.model('deployments',Deployment);

module.exports = {deployments};