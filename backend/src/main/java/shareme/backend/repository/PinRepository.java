package shareme.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import shareme.backend.entity.Pin;

@Repository
public interface PinRepository extends JpaRepository<Pin, String> {
  List<Pin> findAllByUser_UserId(String userId);

  @Query("SELECT p FROM Pin p WHERE LOWER(p.title) LIKE CONCAT('%', LOWER(:keyword), '%') OR LOWER(p.category) LIKE CONCAT('%', LOWER(:keyword), '%') OR LOWER(p.about) LIKE CONCAT('%', LOWER(:keyword), '%')")
  List<Pin> findAllByTitleOrCategoryOrAbout(@Param("keyword") String keyword);  
  
}
