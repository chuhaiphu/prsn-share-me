package shareme.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.CommentDTO;
import shareme.backend.entity.Comment;
import shareme.backend.entity.Pin;
import shareme.backend.entity.User;
import shareme.backend.repository.CommentRepository;
import shareme.backend.repository.PinRepository;
import shareme.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class CommentService {
  private final PinRepository pinRepository;
  private final CommentRepository commentRepository;
  private final UserRepository userRepository;

  public CommentDTO addCommentDTO(CommentDTO commentDTO) {
    Pin pin = pinRepository.findById(commentDTO.getPinId()).get();
    User user = userRepository.findById(commentDTO.getUserId()).get();
    Comment comment = new Comment();
    comment.setComment(commentDTO.getComment());
    comment.setPin(pin);
    comment.setUser(user);
    commentRepository.save(comment);
    return commentDTO;
  }

  public List<CommentDTO> getAllCommentsByPinId(String pinId) {
    return commentRepository.findAllByPin_PinId(pinId).stream()
        .map(comment -> new CommentDTO(
            comment.getCommentId(),
            comment.getComment(),
            comment.getUser().getUserId(),
            comment.getPin().getPinId()
            ))
        .collect(Collectors.toList());
  }

  public CommentDTO getCommentById(String commentId) {
    Comment comment = commentRepository.findById(commentId).get();
    return new CommentDTO(
        comment.getCommentId(),
        comment.getComment(),
        comment.getUser().getUserId(),
        comment.getPin().getPinId()
        );
  }
}
