
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

//variables
var stompClient = null;
var socket = null;
var username = null;
var mail = null;
var password = null;
var room = null;












//event listener
//rooms.map(room => room.addEventListener('click', joinChat, true))
for(var i = 0; i < rooms.length; i++) { 
    rooms[i].addEventListener('click', joinChat, true);
}
messageForm.addEventListener('submit', sendMessage, true);

