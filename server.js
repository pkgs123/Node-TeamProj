const express = require('express'),
app = express(),
db = require('./api/models/db'),
config = require('./config');
mongoose = require('mongoose');

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended: true}));

mongoose.connect(encodeURI(db.url),{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true});

let mdb = mongoose.connection;

console.log('readyState',mdb.readyState);


require('./api/routes/index')(app);

app.listen(config.port, ()=>{
console.log(`Listening to port: http://localhost:${config.port}`);
});