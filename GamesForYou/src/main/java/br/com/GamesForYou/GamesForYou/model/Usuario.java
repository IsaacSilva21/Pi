package br.com.GamesForYou.GamesForYou.model;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data

@Entity
@Table(name = "usuario")
public class Usuario {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
    private Integer id;

    @NotBlank(message = "O nome é obrigatório!")
    @Column(name = "nome", length = 50, nullable = true)
    private String nome;

    @Email(message = "Insira um email válido!")
    @NotBlank(message = "O email é obrigatório")
    @Column(name = "email", length = 50, nullable = true)
    private String email;
    
    @NotBlank(message = "A senha é obrigatório")
    @Column(name = "senha", columnDefinition  = "TEXT", nullable = true)
    private String senha;

  // @ValidCPF
    @NotBlank(message = "O cpf é obrigatório")
    @Column(name = "cpf", length = 11, nullable = true, unique = true)
    private String cpf;

    @Column(name = "nivel", nullable = false)
    private Integer nivel;
    @Column(name = "status", nullable = false)
    private Boolean status;

}
