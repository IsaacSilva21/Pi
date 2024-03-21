package br.com.GamesForYou.GamesForYou.model;



import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 

@Entity
@Table(name = "produtos") 
public class Produtos {
  
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Integer id;

     @NotBlank(message = "O nome é obrigatório")
     @Column(name = "nome_produto", length = 50, nullable = true)
     private String nome;

     @NotBlank(message = "A descrição é obrigatório")
     @Column(name = "descricao", length = 255, nullable = false)
     private String descricao;

     @NotNull(message = "O preço é obrigatório")
    @DecimalMin(value = "0.00", message = "O preço não pode ser negativo") 
    @DecimalMax(value = "999999.99", message = "O preço não pode ser maior que 999999.99") 
    @Column(name = "preco", precision = 10, scale = 2, nullable = false)
     private BigDecimal preco;
   
     @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa") 
    @Max(value = 1000, message = "A quantidade não pode ser maior que 1000") 
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    //@Data faz os construtores e getter e setters
    // public Integer getId() {
    //   return id;
    // }
    // public void setId(Integer id) {
    //   this.id = id;
    // }
    // public String getNome() {
    //   return nome;
    // }
    // public void setNome(String nome) {
    //   this.nome = nome;
    // }
   
}
