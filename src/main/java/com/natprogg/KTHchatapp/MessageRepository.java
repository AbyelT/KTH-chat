package com.natprogg.KTHchatapp;

import com.natprogg.KTHchatapp.Model.Message;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface MessageRepository extends CrudRepository<Message, Integer>{
    
}
