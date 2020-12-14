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

function createAccount(event) {
    username = document.querySelector('#name').value.trim();
    mail = document.querySelector('#mail').value.trim();
    password = document.querySelector('#pass').value.trim();

    if(username && password && mail) {
        
        //connect to client, check if account already exists
        socket = new SockJS('/KTHchat');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        //if not: create new and go to main page
        if(true) {
            startPage.classList.add('hidden');
            chatOverviewPage.classList.remove('hidden');
            
        } else{
            //else: disconnect and display error
        }
    }
    event.preventDefault();
}

function loginAccount(event) {
    username = document.querySelector('#name').value.trim();
    mail = document.querySelector('#mail').value.trim();
    password = document.querySelector('#pass').value.trim();

    if(username && password && mail) {
       //connect to kth-chat 
       var socket = new SockJS('/KTHchat');
       stompClient = Stomp.over(socket);
       stompClient.connect({}, onConnected, onError);

        //BRA IDE, kolla om controller kan ta emot inkommande requests och antingen köra onConnected (vid success) eller onError (om validering failar)
       //if true: sign in and go to main page
        if(true) {  
            startPage.classList.add('hidden');
            chatOverviewPage.classList.remove('hidden');
        }
        else {
            //else: disconnet and show error
        }
    }
    event.preventDefault();
}

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
    //if the connection succed
}

//if the connection fails
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


//event listener
console.log(rooms);
rooms.map(room => room.addEventListener('click', joinChat, true))
/*
for(var i = 0; i < rooms.length; i++) { 
    rooms[i].addEventListener('click', joinChat, true);
}*/
login.addEventListener('submit', createAccount, true);
register.addEventListener('submit', loginAccount, true);
messageForm.addEventListener('submit', sendMessage, true);