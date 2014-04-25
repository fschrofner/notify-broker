#Notify NodeJs Broker

This Nodejs serverpage is intended to be used as a broker for the Notify app.  
Due to the limitations of the Aerogear Unified Push Server it's not possible to send pushes without specifying the Master-Secret, which is not acceptable for Notify, since we need to send pushes from each  Client (including Javascript Clients, which would reveal their source code).  
The server is completely based on the (https://github.com/sebastienblanc/hackergarten-messenger/blob/master/server/index.js)[hackergarten-messenger] server by Sebastien Blanc.  

To use this server yourself you need to create a constants.js file next to the broker.js, containing the following information:

```
var url = "URL";

var settings = {
 applicationID: "APPLICATION_ID",
 masterSecret: "MASTER_SECRET"
};

exports.url = url;
exports.settings = settings;
```

Also you need to download the needed packages for the server using the following code:

```
npm install aerogear-sender-client body-parser errorhandler express
```

After that simply run `node broker.js` and you've got your server running.