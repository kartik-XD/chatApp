const express = require('express');
const app = express();
const http = require('http');
const { disconnect } = require('process');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// server is created
app.use(express.static("public"));// automatically uses index.html as response to GET/ request
// connection event attached

let userList=[];
io.on('connection', (socket) => {
    console.log(socket.id+' connected');
    socket.on("userConnected",function(username){
      let userobj={id: socket.id , username: username};

      userList.push(userobj);
      // console.log(userList);

      //for self

      socket.emit("onlineList",userList);

      //for other users
      socket.broadcast.emit("join",userobj);
    })
    socket.on("chat",function(chatobj){
      socket.broadcast.emit("userchat",chatobj);
      
    })
    socket.on("disconnect",function(){
      let leftuser;
      let remaininguser= userList.filter(function(userobj){
        if(userobj.id==socket.id){
          leftuser=userobj;
          return false;
        }
        return true;
      })
      userList=remaininguser;
      socket.broadcast.emit("userDisconnect",leftuser);
    })

  });

  let port= process.env.PORT || 3000;
server.listen(port,function(){
    console.log("server listening at port 5500!");
})