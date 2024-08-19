package shareme.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PinDTO {
  private String pinId;
  private String title;
  private String about;
  private String destination;
  private String category;
  private String imageUrl;
  private String userId;
  private List<SaveDTO> saveDTOs;
  private List<CommentDTO> commentDTOs;
}
