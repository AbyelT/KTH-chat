//pages & components
var header = document.querySelector('.header');
var chatOverviewPage = document.querySelector('#chat-rooms');
var rooms = document.getElementsByClassName('joinRoom');
var userInSession = document.querySelector('#username-text');

//buttons & input
var logoutBtn = document.querySelector('#logoutBtn');
var chatroomName = document.querySelector('#chatroom-name');

//variables
var stompClient = null;
var socket = null;
var username = "test";
var room = null;
var roomId = null;

var userColors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function joinChat(event) {
    var room = event.target.parentElement.id;
    console.log(room)
    //When we join a chat set the roomid in localstorage.
    window.localStorage.setItem("room", room);
}

//function which handles logout
function logout(event) {
    stompClient.disconnect(function() {
    alert("See you next time!");
  });
  localStorage.clear();
  window.location = "/";
}

function onConnected() {
    console.log("connection success");
    connectingElement.textContent = "";
    connectingElement.style.display = "none";
}

//if the connection fails
function onError(error) {
    console.log("CONNECTION FAILED");
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.display = "block";
    connectingElement.style.color = 'red';
}

//function sendMessage(event) {
//    var messageContent = messageInput.value.trim();
//    if(messageContent && stompClient) {
//        var chatMessage = {
//            sender: username,
//            content: messageInput.value,
//            type: 'CHAT'
//        };
//        stompClient.send("/app/chat.sendMessage/" + room, {}, JSON.stringify(chatMessage));
//        messageInput.value = '';
//    }
//    event.preventDefault();
//}
//
//function onMessageReceived(payload) {
//    var message = JSON.parse(payload.body);
//    var messageElement = document.createElement('li');
//
//    if(message.type === 'JOIN') {
//        messageElement.classList.add('event-message');
//        message.content = message.sender + ' joined!';
//    } else if (message.type === 'LEAVE') {
//        messageElement.classList.add('event-message');
//        message.content = message.sender + ' left!';
//    } else {
//        messageElement.classList.add('chat-message');
//
//        var avatarElement = document.createElement('i');
//        var avatarText = document.createTextNode(message.sender[0]);
//        avatarElement.appendChild(avatarText);
//        avatarElement.style['background-color'] = getAvatarColor(message.sender);
//        messageElement.appendChild(avatarElement);
//
//        var usernameElement = document.createElement('span');
//        var usernameText = document.createTextNode(message.sender);
//        usernameElement.appendChild(usernameText);
//        messageElement.appendChild(usernameElement);
//    }
//
//    var textElement = document.createElement('p');
//    var messageText = document.createTextNode(message.content);
//    textElement.appendChild(messageText);
//    messageElement.appendChild(textElement);
//    messageArea.appendChild(messageElement);
//    messageArea.scrollTop = messageArea.scrollHeight;
//}

//function onHistoryReceived(payload) {
//    messageArea.innerHTML="";
//    messageArea.textContent="";
//    var message = JSON.parse(payload.body);
//    console.log(message); //is it object or array?
//    for (var i=0; i<message.length; i++)
//    {
//        var messageElement = document.createElement('li');
//        messageElement.classList.add('chat-message');
//
//        var avatarElement = document.createElement('i');
//        var avatarText = document.createTextNode(message[i].username.charAt(0));  //username?
//        avatarElement.appendChild(avatarText);
//        avatarElement.style['background-color'] = getAvatarColor(message[i].username);   //sender?
//        messageElement.appendChild(avatarElement);
//
//        var usernameElement = document.createElement('span');
//        var usernameText = document.createTextNode(message[i].username);
//        usernameElement.appendChild(usernameText);
//        messageElement.appendChild(usernameElement);
//        
//        var textElement = document.createElement('p');
//        var messageText = document.createTextNode(message[i].messageText);
//        textElement.appendChild(messageText);
//        messageElement.appendChild(textElement);
//        messageArea.appendChild(messageElement);
//        messageArea.scrollTop = messageArea.scrollHeight;
//    }
//}

function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % userColors.length);
    return userColors[index];
}

//If we are not connected to a websocket due to some error, create it here
if(socket === null) {
    var socket = new SockJS('/KTHchat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    username = localStorage.getItem("username");
    userInSession.innerHTML = username;
//    console.log(username);
}

//console.log(rooms);
//event listeners for join room buttons
for(var i = 0; i < rooms.length; i++) { 
    rooms[i].addEventListener('click', joinChat, true);
}
//leaveBtn.addEventListener('click', leaveChat, true);
//messageForm.addEventListener('submit', sendMessage, true);

//Eventlistener for logout button.
logoutBtn.addEventListener('click', logout, true);
