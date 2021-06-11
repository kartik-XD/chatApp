
let chatInput = document.querySelector(".chat-input");
let chatWindow =  document.querySelector(".chat-window");
let myusername = document.querySelector(".me .user-name")
let username = prompt("Enter Your Name ");

myusername.textContent=username;

chatInput.addEventListener("keypress" , function(e){
    console.log(e);
    if(e.key == "Enter"){
        console.log("inside key enter");
        let chatDiv = document.createElement("div");
        chatDiv.classList.add("chat");
        chatDiv.classList.add("right");
        chatDiv.textContent = username+ " : " +chatInput.value;
        chatWindow.append(chatDiv);
        socket.emit("chat",{username,chat:chatInput.value});
        chatInput.value = "";
    }
})