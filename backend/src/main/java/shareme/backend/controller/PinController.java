package shareme.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.PinDTO;
import shareme.backend.service.PinService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/pin")
@RequiredArgsConstructor
public class PinController {
  private final PinService pinService;

  @GetMapping("")
  public ResponseEntity<List<PinDTO>> getAllPins() {
    return ResponseEntity.ok(pinService.getAllPins());
  }

  @GetMapping("/{pinId}")
  public ResponseEntity<PinDTO> getPinById(@PathVariable String pinId) {
    return ResponseEntity.ok(pinService.getPinById(pinId));
  }

  @GetMapping("/search")
  public ResponseEntity<List<PinDTO>> searchPins(@RequestParam String searchTerm) {
      return ResponseEntity.ok(pinService.searchPinsByTitleOrCategoryOrAbout(searchTerm));
  }

  @GetMapping("/category/{category}")
  public ResponseEntity<List<PinDTO>> getAllPinsByCategories(@PathVariable String category) {
      return ResponseEntity.ok(pinService.getPinsByCategories(category));
  }
  

  @GetMapping("/user")
  public ResponseEntity<List<PinDTO>> getAllPinsByUserId(@RequestParam String userId) {
      return ResponseEntity.ok(pinService.getAllPinsByUserId(userId));
  }

  @PostMapping("")
  public ResponseEntity<PinDTO> createPin(@RequestBody PinDTO pinDTO) {
    return ResponseEntity.ok(pinService.createPin(pinDTO));
  }
  
  @DeleteMapping("/{pinId}")
  public void deletePin(@PathVariable String pinId) {
    pinService.deletePin(pinId);
  }
}
