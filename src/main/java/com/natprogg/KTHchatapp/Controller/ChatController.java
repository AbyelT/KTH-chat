package com.natprogg.KTHchatapp.Controller;
import com.natprogg.KTHchatapp.Model.Chat;
import com.natprogg.KTHchatapp.User;
import com.natprogg.KTHchatapp.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Autowired;
import com.natprogg.KTHchatapp.Model.Login;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@ComponentScan("com.natprogg")
public class ChatController {
    //@Autowired // This means to get the bean called userRepository
               // Which is auto-generated by Spring, we will use it to handle the data
    //private UserRepository userRepository;
    
    
    @MessageMapping("/chat.sendMessage/{room}")
    @SendTo("/topic/{room}")
    public Chat sendMessage(@Payload Chat Chat) {
        return Chat;
    } 
    
    /*
    @MessageMapping("/chat.sendMessage/")
    @SendTo("/topic/")
    public Chat realmessage(@Payload Chat Chat) {
        return Chat;
    }
    */
    
    /*
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/{room}")
    public Chat addUser(@Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {   
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", Chat.getSender());
        return Chat;
    }
    */
    
    @MessageMapping("/chat.UserJoin/{room}")
    @SendTo("/topic/{room}")
    public Chat joinChatroom(@DestinationVariable String room, @Payload Chat Chat, SimpMessageHeaderAccessor headerAccessor) {   
        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", Chat.getSender());
        return Chat;
    }

    @PostMapping(path="/login") // Map ONLY POST Requests
    public ModelAndView login (@RequestParam String username
        ,@RequestParam String email, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name@ResponseBody String
        // @RequestParam means it is a parameter from the GET or POST request
        
        //Iterable<User> myUsers = userRepository.findAll();
        ModelAndView modelAndView = new ModelAndView();
        boolean foundUser = true;       //for abel testing :)
        /*
        for (User us: myUsers) {
            System.out.println(us);
            if (username.equals(us.getUsername()) && email.equals(us.getEmail()) && password.equals(us.getPassword())) {
                foundUser = true;
                break;
            }
        }
        */
        
        if(foundUser) {
            modelAndView.setViewName("chat");
            System.out.println("found user");
            return modelAndView;
        }
        else {
           modelAndView.setViewName("index");
           System.out.println("login failed");
           return modelAndView;
        }
    }
    
    //@MessageMapping("/addUser")
    @PostMapping(path="/add") // Map ONLY POST Requests
    public ModelAndView addNewUser (@RequestParam String username
        ,@RequestParam String email, @RequestParam String password) {
      // @ResponseBody means the returned String is the response, not a view name@ResponseBody String
      // @RequestParam means it is a parameter from the GET or POST request
      System.out.println("Creating a user");
      User n = new User();
      n.setUsername(username);
      n.setEmail(email);
      n.setPassword(password);
      
      //save to database
      /*
      try {
      userRepository.save(n);
      }catch(Exception e) {
        e.printStackTrace();      
      }
*/
      ModelAndView modelAndView = new ModelAndView();
      modelAndView.setViewName("chatroomOverView");
      
      return modelAndView;

    }
    
//    @GetMapping(path="/all")
//    public @ResponseBody Iterable<User> getAllUsers() {
//      // This returns a JSON or XML with the users
//      return userRepository.findAll();
//    }
    
    @MessageMapping("/chat.validateUser")
    @SendTo("/topic/public")
    public Chat validateUser(@Payload Login auth, SimpMessageHeaderAccessor headerAccessor) {   
        
        //create an entityclass User with the given parameters
        //let user sens it to external database 
        
        String testUser = "";
        String testPass = "";

        if(testUser == auth.getUserid() && testPass == auth.getPassword()) {
            
        }
        
        return null;
    }
}
