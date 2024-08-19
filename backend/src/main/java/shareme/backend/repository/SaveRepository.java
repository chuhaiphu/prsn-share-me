package shareme.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shareme.backend.entity.Save;

@Repository
public interface SaveRepository extends JpaRepository<Save, String> {
  List<Save> findAllByUser_UserId(String userId);
}
