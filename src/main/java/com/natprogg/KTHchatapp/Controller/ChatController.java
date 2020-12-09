package com.natprogg.KTHchatapp.Controller;
import com.natprogg.KTHchatapp.Model.Chat;
import com.natprogg.KTHchatapp.Model.Login;
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
    
    @MessageMapping("/chat.validateUser")
    @SendTo("/topic/public")
    public Chat validateUser(@Payload Login auth, SimpMessageHeaderAccessor headerAccessor) {   
        
        //create an entityclass User with the given parameters
        //let user sens it to external database 
        
        String testUser = "";
        String testPass = "";

        if(testUser == auth.getUserid() && testPass == auth.getPassword()) {
            
        }
        
        //if: valid -> return OK + new page
        //else -> return denied + same page
        return null;
    }
    
    public Chat joinChatroom(@Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {   
        //join the desired chat room
        return null;
    }
    
    public Chat vUser(@Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {   
        return null;
    }
}