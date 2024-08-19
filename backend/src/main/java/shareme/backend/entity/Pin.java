package shareme.backend.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.GenericGenerator;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import shareme.backend.config.CustomIdGenerator;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PIN")
public class Pin {
  @Id
  @GeneratedValue(generator = "custom-id")
  @GenericGenerator(name = "custom-id", type = CustomIdGenerator.class)
  @Column(name = "PIN_ID")
  private String pinId;

  @Column(name = "TITLE")
  private String title;

  @Column(name = "ABOUT")
  private String about;

  @Column(name = "DESTINATION")
  private String destination;

  @Column(name = "CATEGORY")
  private String category;

  @Column(name = "IMAGE_URL")
  private String imageUrl;

  @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  @JoinColumn(name = "USER_ID")
  private User user;

  @OneToMany(mappedBy = "pin", cascade = CascadeType.ALL)
  private List<Save> saves = new ArrayList<>();

  @OneToMany(mappedBy = "pin", cascade = CascadeType.ALL)
  private List<Comment> comments = new ArrayList<>();

}