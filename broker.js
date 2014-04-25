var express = require('express');
var bodyParser = require('body-parser');
var agSender = require('aerogear-sender-client').AeroGear;
var url = require('./constants').url;
var settings = require('./constants').settings;

//the message has no real data
var message = {
  alert: "push"
}

var app = express();

app.use(bodyParser());

app.post('/push', function(req, res) {
  console.log(req.body);
  //alias needs to be checked first
  if(req.body.alias != null && req.body.alias !== undefined 
   && req.body.alias != ''){
    settings.criteria = {alias: [req.body.alias]};

    agSender.Sender(url).send(message, settings)
      .on("success", function(response) {
        console.log('success', response);
        res.send(response);
      })
      .on("error", function(err) {
        console.log('error', err);
        res.send(err);
      });
  } else {
    console.log('error', 'alias not valid');
    res.send('alias not valid');
  }

});

app.use(require('errorhandler'));

//if you're hosting the server yourself use these values
var port = process.env.PORT || 1414;
app.listen(port);

//when using the OpenShift Cartdridge please use these instead
//var ipaddress  = process.env.OPENSHIFT_NODEJS_IP;
//var port    = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080;
//app.listen(port, ipaddress);

console.log('Express app started on port ' + port);