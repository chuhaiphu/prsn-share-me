package shareme.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import shareme.backend.dto.SaveDTO;
import shareme.backend.entity.Save;
import shareme.backend.repository.PinRepository;
import shareme.backend.repository.SaveRepository;
import shareme.backend.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class SaveService {
  private final SaveRepository saveRepository;
  private final UserRepository userRepository;
  private final PinRepository pinRepository;

  public SaveDTO createSave(SaveDTO saveDTO) {
    Save save = new Save();
    save.setUser(userRepository.findById(saveDTO.getUserId()).get());
    save.setPin(pinRepository.findById(saveDTO.getPinId()).get());
    saveRepository.save(save);
    return saveDTO;
  }

  public List<SaveDTO> getAllSavesByUserId(String userId) {
    return saveRepository.findAllByUser_UserId(userId).stream()
        .map(save -> new SaveDTO(
            save.getSaveId(),
            save.getUser().getUserId(),
            save.getPin().getPinId()))
        .collect(Collectors.toList());
  }
}
