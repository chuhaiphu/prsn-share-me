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
public class UserDTO {
  private String userId;
  private String userName;
  private String imageUrl;
  private List<PinDTO> pinDTOs;
  private List<CommentDTO> commentDTOs;
  private List<SaveDTO> saveDTOs;
}
