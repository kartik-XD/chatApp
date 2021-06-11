let showonline=document.querySelector(".online-list");

socket.emit("userConnected",username);

socket.on("join",function(dataobj){
    let joindiv=document.createElement("div");//<div></div>
    joindiv.classList.add("chat");
    joindiv.classList.add("join");

    joindiv.innerText=`${dataobj.username} entered in the lobby`;

    chatWindow.append(joindiv);

    updateOnlineList(dataobj);
    
})

socket.on("userDisconnect",function(dataobj){
    let leftdiv=document.createElement("div");
    leftdiv.classList.add("chat");
    leftdiv.classList.add("leave");
    leftdiv.innerText=`${dataobj.username} left the lobby :(`
    chatWindow.append(leftdiv);
    deleteFromOnlineList(dataobj.id);
})


socket.on("userchat",function(chatobj){
    let chatdiv=document.createElement("div");
    chatdiv.classList.add("chat");
    chatdiv.classList.add("left");
    chatdiv.innerText= chatobj.username+" : "+ chatobj.chat;
    chatWindow.append(chatdiv);
})
socket.on("onlineList",function(userList){

    for(let i =0; i<userList.length;i++){
        if(userList[i].id!=socket.id){
    let userdiv= document.createElement("div");
    userdiv.classList.add("user");
    userdiv.setAttribute("id",userList[i].id)
    userdiv.innerHTML=`<div class="user-image">
    <img src="Sample_User_Icon.png" alt="">
</div>
<div class="user-name">${userList[i].username}</div>`
showonline.append(userdiv);
        }
                    
    }                 
})
function deleteFromOnlineList(id){
    document.querySelector(`#${id}`).remove();
}

function updateOnlineList(userobj){
    let userdiv= document.createElement("div");
    userdiv.classList.add("user");
    userdiv.setAttribute("id",userobj.id)
    userdiv.innerHTML=`<div class="user-image">
    <img src="Sample_User_Icon.png" alt="">
</div>
<div class="user-name">${userobj.username}</div>`
showonline.append(userdiv);
}