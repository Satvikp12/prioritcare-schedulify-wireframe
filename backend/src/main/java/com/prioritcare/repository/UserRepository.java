
package com.prioritcare.repository;

import com.prioritcare.entity.User;
import com.prioritcare.entity.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    List<User> findByRole(Role role);
    boolean existsByEmail(String email);
}
