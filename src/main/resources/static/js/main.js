
//pages & components
var startPage = document.querySelector('#start-page');
var header = document.querySelector('.header');
var chatOverviewPage = document.querySelector('#chat-rooms');
var chatPage = document.querySelector('#chat-page');
var connectingElement = document.querySelector('.connecting');
var rooms = document.getElementsByClassName('joinRoom');

//buttons & input
//var login = document.querySelector('#login');
//var register = document.querySelector('#register');
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

//event listener
console.log(rooms);
//rooms.map(room => room.addEventListener('click', joinChat, true));

for(var i = 0; i < rooms.length; i++) { 
    rooms[i].addEventListener('click', joinChat, true);
}
//login.addEventListener('click',loginAccount, true);
//register.addEventListener('click', createAccount, true);
//messageForm.addEventListener('submit', sendMessage, true);
