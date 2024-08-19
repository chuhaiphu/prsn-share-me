package shareme.backend.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.UserDTO;
import shareme.backend.entity.User;
import shareme.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public void saveUserInfo(User user) {
    userRepository.save(user);
  }

  public UserDTO getUserInfo(String userId) {
    User user = userRepository.findById(userId).get();
    
    return new UserDTO(user.getUserId(), user.getUserName(), user.getImageUrl(), null, null, null);
  }
}
