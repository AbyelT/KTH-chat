package com.natprogg.KTHchatapp;
import org.springframework.data.repository.CrudRepository;
import com.natprogg.KTHchatapp.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete
public interface UserRepository extends CrudRepository<User, Integer> {

}
