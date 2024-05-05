package br.com.GamesForYou.GamesForYou.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

@Entity
@Table(name = "carrinho")
public class Carrinho {

  

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Integer id;
  
  @NotBlank(message = "o nome é obrigatorio")
  @Column(name ="nome", length = 50, nullable = true)
  private String nome;

  @NotNull(message = "valor é obrigatorio")
  @Column(name = "valor", columnDefinition = "TEXT", nullable = true)
  private double valor;

  
    //@Lob
    //@Column(name = "imagem", nullable = false)
    //private byte[] imagem;  

}
