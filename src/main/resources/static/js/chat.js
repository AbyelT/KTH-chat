/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//pages & components
var startPage = document.querySelector('#start-page');
var header = document.querySelector('.header');
var chatOverviewPage = document.querySelector('#chat-rooms');
var chatPage = document.querySelector('#chat-page');
var connectingElement = document.querySelector('.connecting');
var rooms = document.getElementsByClassName('joinRoom');

//buttons & input
var login = document.querySelector('#login');
var register = document.querySelector('#register');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var loginForm = document.querySelector('#loginForm');

//variables
var stompClient = null;
var socket = null;
var username = null;
var mail = null;
var password = null;
var room = null;

var userColors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function joinChat(event) {
    room = event.target.parentElement.id;
    console.log(event.target);

    //connect to chatroom by subscribing to chosen, change page
    stompClient.subscribe('/topic/' + room, onMessageReceived);
    chatOverviewPage.classList.add('hidden');
    chatPage.classList.remove('hidden');
    
    stompClient.send("/app/chat.UserJoin/" + room,
        {}, JSON.stringify({sender: username, type: 'JOIN'})
    );
    connectingElement.classList.add('hidden');
    event.preventDefault();
}

function onConnected() {
    console.log("connection success");
    stompClient.send("/app/addUser/" + room,
        {}, JSON.stringify({username: username,sender: username, type: 'JOIN'})
    );
}

//if the connection fails
function onError(error) {
    console.log("CONNECTION FAILED");
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if(messageContent && stompClient) {
        var chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage/" + room, {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    var messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);
        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);
    messageElement.appendChild(textElement);
    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}


//event listener
//console.log(rooms);
//rooms.map(room => room.addEventListener('click', joinChat, true));

//for(var i = 0; i < rooms.length; i++) { 
//    rooms[i].addEventListener('click', joinChat, true);
//}
//login.addEventListener('click',loginAccount, true);
//register.addEventListener('click', createAccount, true);
messageForm.addEventListener('submit', sendMessage, true);
