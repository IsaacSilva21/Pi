package br.com.GamesForYou.GamesForYou.model;

import org.hibernate.validator.constraints.br.CPF;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

@Entity
@Table(name = "usuario")
public class Usuario {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
    private Integer id;

    @NotBlank(message = "O nome é obrigatório")
    @Column(name = "nome", length = 50, nullable = true)
    private String nome;

    @Email(message = "Insira um email válido!")
    @NotBlank(message = "O email é obrigatório")
    @Column(name = "email", length = 50, nullable = true)
    private String email;
    
    @NotBlank(message = "A senha é obrigatório")
    @Column(name = "senha", columnDefinition  = "TEXT", nullable = true)
    private String senha;

    @CPF(message = "Digite um cpf válido")
    @NotBlank(message = "O cpf é obrigatório")
    @Column(name = "cpf", length = 11, nullable = true, unique = true)
    private String cpf;

    @Column(name = "nivel", nullable = false)
    private Integer nivel;
    @Column(name = "status", nullable = false)
    private Boolean status;
    

   //@Data faz os construtores e getter e setters
    // public int getId() {
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
    // public String getEmail() {
    //   return email;
    // }
    // public void setEmail(String email) {
    //   this.email = email;
    // }
    // public String getSenha() {
    //   return senha;
    // }
    // public void setSenha(String senha) {
    //   this.senha = senha;
    // }
    // public void setCpf(String cpf) {
    //    this.cpf = cpf;
    //  }
    // public Integer getNivel() {
    //   return nivel;
    // }
    // public void setNivel(Integer nivel) {
    //   this.nivel = nivel;
    // }
    // public String getCpf() {
    //   return cpf;
    // }
    // public Boolean getStatus() {
    //   return status;
    // }
    // public void setStatus(Boolean status) {
    //   this.status = status;
   // }
    
  
  
}
