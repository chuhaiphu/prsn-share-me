package shareme.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.SaveDTO;
import shareme.backend.service.SaveService;

@CrossOrigin
@RestController
@RequestMapping("/save")
@RequiredArgsConstructor
public class SaveController {
  private final SaveService saveService;

  @GetMapping("/user")
  public ResponseEntity<List<SaveDTO>> getAllSavesByUserId(@RequestParam String userId) {
    return ResponseEntity.ok(saveService.getAllSavesByUserId(userId));
  }

  @PostMapping("")
  public ResponseEntity<SaveDTO> createSave(@RequestBody SaveDTO saveDTO) {
    return ResponseEntity.ok(saveService.createSave(saveDTO));
  }
}
