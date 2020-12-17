package com.natprogg.KTHchatapp.Model;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    //skapar en WebSocket endpoint för alla clienter att koppla sig till
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/KTHchat").withSockJS();
    }

    @Override
    //vidarebefodrar alla inkommande meddelanden till andra klienter
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/topic", "/user", "/queue");
    }
}
