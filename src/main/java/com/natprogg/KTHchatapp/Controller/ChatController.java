package com.natprogg.KTHchatapp.Controller;
import com.natprogg.KTHchatapp.Model.Chat;
import com.natprogg.KTHchatapp.User;
import com.natprogg.KTHchatapp.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class ChatController {
    @Autowired // This means to get the bean called userRepository
               // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;
    
    
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
    
    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody String addNewUser (@RequestParam String username
        , @RequestParam String email, @RequestParam String password) {
      // @ResponseBody means the returned String is the response, not a view name
      // @RequestParam means it is a parameter from the GET or POST request

      User n = new User();
      n.setUsername(username);
      n.setEmail(email);
      n.setPassword(password);
      userRepository.save(n);
      return "Saved";
    }
    
    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
      // This returns a JSON or XML with the users
      return userRepository.findAll();
    }
      
    public Chat validateUser(@Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {   
        //check mySQL database?
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