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
    User existingUser = userRepository.findById(user.getUserId()).orElse(null);
    if (existingUser != null) {
      // Update only the necessary fields
      existingUser.setUserName(user.getUserName());
      existingUser.setImageUrl(user.getImageUrl());
      userRepository.save(existingUser);
    } else {
      // If it's a new user, save as is
      userRepository.save(user);
    }
  }

  public UserDTO getUserInfo(String userId) {
    User user = userRepository.findById(userId).get();
    
    return new UserDTO(user.getUserId(), user.getUserName(), user.getImageUrl(), user.getBackgroundImageUrl(), null, null, null);
  }
  
  public User updateBackgroundImage(User user) {
    User existingUser = userRepository.findById(user.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
    existingUser.setBackgroundImageUrl(user.getBackgroundImageUrl());
    return userRepository.save(existingUser);
  }
}
