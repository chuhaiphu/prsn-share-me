package shareme.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.UserDTO;
import shareme.backend.entity.User;
import shareme.backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  
  @PostMapping("/login")
  public void login(@RequestBody User user) {
    userService.saveUserInfo(user);
  }

  @GetMapping("/{userId}")
  public ResponseEntity<UserDTO> getUserDTO(@PathVariable String userId) {
      return ResponseEntity.ok(userService.getUserInfo(userId));
  
  }
}
