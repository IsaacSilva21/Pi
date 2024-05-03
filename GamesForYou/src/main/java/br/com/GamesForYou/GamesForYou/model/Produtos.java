package br.com.GamesForYou.GamesForYou.model;



import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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
     @Column(name = "nome_produto", length = 200, nullable = true)
     private String nome;

     @NotNull(message = "O preço é obrigatório")
    @DecimalMin(value = "0.00", message = "O preço não pode ser negativo") 
    @DecimalMax(value = "999999.99", message = "O preço não pode ser maior que 999999.99") 
    @Column(name = "valor", precision = 10, scale = 2, nullable = false)
     private BigDecimal valor;
   
     @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa") 
    @Max(value = 1000, message = "A quantidade não pode ser maior que 1000") 
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @NotNull(message = "A avaliação é obrigatória")
    @Min(value = 0, message = "A avaliação não pode ser negativa")
    @Max(value = 5, message = "A quantidade não pode ser maior que 5") 
    @Column(name = "avaliacao", nullable = false)
    private Integer avaliacao;

    @NotBlank(message = "A descrição é obrigatório")
     @Column(name = "descricao", length = 2000, nullable = false)
     private String descricao;

    @Column(name = "status", nullable = false)
    private Boolean status;

    @Lob
    @Column(name = "imagem", nullable = false)
    private byte[] imagem;  
}
