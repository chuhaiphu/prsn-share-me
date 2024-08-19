package shareme.backend.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.CommentDTO;
import shareme.backend.service.CommentService;

@CrossOrigin
@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {
  private final CommentService commentService;

  @GetMapping("/pin")
  public ResponseEntity<List<CommentDTO>> getAllCommentsByPinId(@RequestParam String pinId) {
    return ResponseEntity.ok(commentService.getAllCommentsByPinId(pinId));
  }

  @GetMapping("/{commentId}")
  public ResponseEntity<CommentDTO> getCommentById(@PathVariable String commentId) {
    return ResponseEntity.ok(commentService.getCommentById(commentId));
  }
  
  @PostMapping("")
  public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO) {
    return ResponseEntity.ok(commentService.addCommentDTO(commentDTO));
  }
}
