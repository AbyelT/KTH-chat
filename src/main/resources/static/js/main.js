var startPage = document.querySelector('#start-page');
var startpageContainer = document.querySelector('#start-page-container');
var header = document.querySelector('.header');
var chatPage = document.querySelector('#chat-page');
var loginForm = document.querySelector('#loginForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

//var joinButton2 = document.querySelector('.joinRoom2');

var chatRooms = document.querySelector('#chat-rooms');

var stompClient = null;
var username = null;
var password = null;
var room = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function createAccount(event) {
    username = document.querySelector('#name').value.trim();
    password = document.querySelector('#pass').value.trim();

    if(username && password) {
        startPage.classList.add('hidden');
        startpageContainer.classList.add('hidden');
        chatRooms.classList.remove('hidden');

    }
    event.preventDefault();
}

/*
function login(event) {
    username = document.querySelector('#name').value.trim();
    password = document.querySelector('#pass').value.trim();
    
    if(username && password) {
        
        //connect to stomp server
        //try authentication
        
        //if it works: update page to chatroom overview
        //else: remain in the same page, show error tag
        
       
    }
    event.preventDefault();
}
*/

function joinChat(event) {
    room = event.target.parentElement.id;
    console.log(event.target);
    console.log("hello");
    var socket = new SockJS('/KTHchat');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}


function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/' + room, onMessageReceived);
    
    //change page
    chatRooms.classList.add('hidden');
    chatPage.classList.remove('hidden');
    
    // Tell your username to the server
    console.log("connected!")
    stompClient.send("/app/chat.addUser/" + room,
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    );
    
    //Hide the connecting element
    connectingElement.classList.add('hidden');
}

function onError(error) {
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

var rooms = document.getElementsByClassName('joinRoom');

console.log(rooms);

for(var i = 0; i < rooms.length; i++) { 
  rooms[i].addEventListener('click', joinChat, true);
}
loginForm.addEventListener('submit', createAccount, true);
messageForm.addEventListener('submit', sendMessage, true);
