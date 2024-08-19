package shareme.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import shareme.backend.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
  List<Comment> findAllByPin_PinId(String pinId);
}
