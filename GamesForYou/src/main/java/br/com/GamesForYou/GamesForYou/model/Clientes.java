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
@Table(name = "clientes")
public class Clientes {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id")
   private Integer id;

   @NotBlank(message = "O nome é obrigatorio!")
   @Column(name = "nome", length = 50, nullable = true)
   private String nome;

   @Email(message = "Insira um email válido!")
   @NotBlank(message = "o email é obrigatorio")
   @Column(name = "email", columnDefinition = "TEXT", nullable = true)
   private String email;

   @NotBlank(message = "A senha é obrgatório!")
   @Column(name = "senha", columnDefinition = "TEXT",nullable = true)
   private String senha;

   @NotBlank(message = "O cpf é obrgatório!")
   @Column(name = "cpf", length = 11, nullable = true,unique = true)
   private String cpf;

   @NotBlank(message = "Data de nascimento é obrgatório!")
   @Column(name = "data", nullable = true)
   private String data;

   @NotBlank(message = "Gênero é obrgatório!")
   @Column(name = "genero", nullable = true)
   private String genero;

   @NotBlank(message = "CEP é obrigatório!")
   @Column(name = "cep", length = 8, nullable = true)
   private String cep;

   @NotBlank(message = "Logradouro é obrigatório!")
   @Column(name = "logradouro", nullable = true)
   private String logradouro;

   @Column(name = "numero", nullable = true)
   private String numero;

   @Column(name = "complemento", nullable = true)
   private String complemento;

   @NotBlank(message = "Bairro é obrigatório!")
   @Column(name = "bairro", nullable = true)
   private String bairro;

   @NotBlank(message = "Cidade é obrigatória!")
   @Column(name = "cidade", nullable = true)
   private String cidade;

   @NotBlank(message = "UF é obrigatória!")
   @Column(name = "uf", length = 2, nullable = true)
   private String uf;

   

}
