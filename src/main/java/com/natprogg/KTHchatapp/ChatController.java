package com.natprogg.KTHchatapp;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")
    public Chat sendMessage(@Payload Chat Chat) {
        return Chat;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Chat addUser(@Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {
        
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", Chat.getSender());
        return Chat;
    }
}