package shareme.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shareme.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
  
}
