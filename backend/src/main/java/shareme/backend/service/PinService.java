package shareme.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.CommentDTO;
import shareme.backend.dto.PinDTO;
import shareme.backend.dto.SaveDTO;
import shareme.backend.entity.Pin;
import shareme.backend.entity.User;
import shareme.backend.repository.PinRepository;
import shareme.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class PinService {
  private final PinRepository pinRepository;
  private final UserRepository userRepository;

  public PinDTO createPin(PinDTO pinDTO) {
    User userCreatedPin = userRepository.findById(pinDTO.getUserId()).get();
    Pin pin = new Pin();
    pin.setTitle(pinDTO.getTitle());
    pin.setAbout(pinDTO.getAbout());
    pin.setDestination(pinDTO.getDestination());
    pin.setCategory(pinDTO.getCategory());
    pin.setImageUrl(pinDTO.getImageUrl());
    pin.setUser(userCreatedPin);
    pinRepository.save(pin);
    return pinDTO;
  }

  public List<PinDTO> getAllPins() {
    return pinRepository.findAll().stream()
        .map(pin -> new PinDTO(
            pin.getPinId(),
            pin.getTitle(),
            pin.getAbout(),
            pin.getDestination(),
            pin.getCategory(),
            pin.getImageUrl(),
            pin.getUser().getUserId(),
            pin.getSaves().stream().map(save -> new SaveDTO(
                save.getSaveId(),
                save.getUser().getUserId(),
                save.getPin().getPinId()))
                .collect(Collectors.toList()),
            pin.getComments().stream().map(
                comment -> new CommentDTO(
                    comment.getCommentId(),
                    comment.getComment(),
                    comment.getUser().getUserId(),
                    pin.getPinId()))
                .collect(Collectors.toList())))
        .collect(Collectors.toList());
  }

  public PinDTO getPinById(String pinId) {
    Pin pin = pinRepository.findById(pinId).get();
    return new PinDTO(
        pin.getPinId(),
        pin.getTitle(),
        pin.getAbout(),
        pin.getDestination(),
        pin.getCategory(),
        pin.getImageUrl(),
        pin.getUser().getUserId(),
        pin.getSaves().stream().map(
            save -> new SaveDTO(
                save.getSaveId(),
                save.getUser().getUserId(),
                save.getPin().getPinId()))
            .collect(Collectors.toList()),
        pin.getComments().stream().map(
            comment -> new CommentDTO(
                comment.getCommentId(),
                comment.getComment(),
                comment.getUser().getUserId(),
                pin.getPinId()))
            .collect(Collectors.toList()));
  }

  public List<PinDTO> getPinsByCategories(String category) {
    return pinRepository.findAll().stream()
        .filter(pin -> pin.getCategory().equals(category))
        .map(pin -> new PinDTO(
            pin.getPinId(),
            pin.getTitle(),
            pin.getAbout(),
            pin.getDestination(),
            pin.getCategory(),
            pin.getImageUrl(),
            pin.getUser().getUserId(),
            pin.getSaves().stream().map(
                save -> new SaveDTO(
                    save.getSaveId(),
                    save.getUser().getUserId(),
                    save.getPin().getPinId()))
                .collect(Collectors.toList()),
            pin.getComments().stream().map(
                comment -> new CommentDTO(
                    comment.getCommentId(),
                    comment.getComment(),
                    comment.getUser().getUserId(),
                    pin.getPinId()))
                .collect(Collectors.toList())))
        .collect(Collectors.toList());
  }

  public List<PinDTO> getAllPinsByUserId(String userId) {
    return pinRepository.findAllByUser_UserId(userId).stream()
        .map(pin -> new PinDTO(
            pin.getPinId(),
            pin.getTitle(),
            pin.getAbout(),
            pin.getDestination(),
            pin.getCategory(),
            pin.getImageUrl(),
            pin.getUser().getUserId(),
            pin.getSaves().stream().map(save -> new SaveDTO(
                save.getSaveId(),
                save.getUser().getUserId(),
                save.getPin().getPinId()))
                .collect(Collectors.toList()),
            pin.getComments().stream().map(
                comment -> new CommentDTO(
                    comment.getCommentId(),
                    comment.getComment(),
                    comment.getUser().getUserId(),
                    pin.getPinId()))
                .collect(Collectors.toList())))
        .collect(Collectors.toList());
  }
  public List<PinDTO> searchPinsByTitleOrCategoryOrAbout (String searchTerm) {
    return pinRepository.findAllByTitleOrCategoryOrAbout(searchTerm).stream()
        .map(pin -> new PinDTO(
            pin.getPinId(),
            pin.getTitle(),
            pin.getAbout(),
            pin.getDestination(),
            pin.getCategory(),
            pin.getImageUrl(),
            pin.getUser().getUserId(),
            pin.getSaves().stream().map(save -> new SaveDTO(
                save.getSaveId(),
                save.getUser().getUserId(),
                save.getPin().getPinId()))
                .collect(Collectors.toList()),
            pin.getComments().stream().map(
                comment -> new CommentDTO(
                    comment.getCommentId(),
                    comment.getComment(),
                    comment.getUser().getUserId(),
                    pin.getPinId()))
                .collect(Collectors.toList())))
        .collect(Collectors.toList());
  }
  
  public PinDTO deletePin(String pinId) {
    Pin pin = pinRepository.findById(pinId).get();
    pinRepository.delete(pin);
    return new PinDTO(
        pin.getPinId(),
        pin.getTitle(),
        pin.getAbout(),
        pin.getDestination(),
        pin.getCategory(),
        pin.getImageUrl(),
        pin.getUser().getUserId(),
        pin.getSaves().stream().map(save -> new SaveDTO(
            save.getSaveId(),
            save.getUser().getUserId(),
            save.getPin().getPinId()))
            .collect(Collectors.toList()),
        pin.getComments().stream().map(
            comment -> new CommentDTO(
                comment.getCommentId(),
                comment.getComment(),
                comment.getUser().getUserId(),
                pin.getPinId()))
            .collect(Collectors.toList()));
  }
}
