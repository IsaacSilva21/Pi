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
@Table(name = "pedidos") 
public class Pedidos {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull(message = "O preço é obrigatório")
    @DecimalMin(value = "0.00", message = "O preço não pode ser negativo") 
    @DecimalMax(value = "999999.99", message = "O preço não pode ser maior que 999999.99") 
    @Column(name = "valor", precision = 10, scale = 2, nullable = false)
    private BigDecimal valor;

    @NotBlank(message = "Nome do produto é obrigatório")
    @Column(name = "nomeProduto ", length = 255, nullable = true)
    private String nomeProduto;

    @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 0, message = "A quantidade não pode ser negativa") 
    @Max(value = 1000, message = "A quantidade não pode ser maior que 1000") 
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;

    @NotBlank(message = "CEP é obrigatório!")
    @Column(name = "cep", length = 9, nullable = false)
    private String cep;

    @NotBlank(message = "Logradouro é obrigatório!")
    @Column(name = "logradouro", nullable = false)
    private String logradouro;

    @Column(name = "numero", nullable = true)
    private String numero;

    @NotBlank(message = "Bairro é obrigatório!")
    @Column(name = "bairro", nullable = false)
    private String bairro;

    @NotBlank(message = "Cidade é obrigatória!")
    @Column(name = "cidade", nullable = false)
    private String cidade;

    @NotBlank(message = "UF é obrigatória!")
    @Column(name = "uf", length = 2, nullable = false)
    private String uf;

    @NotBlank(message = "O status é obrigatório")
    @Column(name = "status", nullable = false)
    private String status;

    @NotNull(message = "O id do cliente é obrigatório")
   @Column(name = "idCliente", nullable = false)
    private Integer idCliente;

    @NotNull(message = "o metodo é obrigatorio")
    @Column(name = "metodoPag", nullable = false)
    private Integer metodoPag;
}
