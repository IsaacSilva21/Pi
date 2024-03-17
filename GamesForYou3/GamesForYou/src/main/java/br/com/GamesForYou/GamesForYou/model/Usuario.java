package br.com.GamesForYou.GamesForYou.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
    private Integer id;
    @Column(name = "nome", length = 200, nullable = true)
    private String nome;
    @Column(name = "email", length = 50, nullable = true)
    private String email;
    @Column(name = "senha", columnDefinition  = "TEXT", nullable = true)
    private String senha;
    @Column(name = "cpf", length = 11, nullable = true, unique = true)
    private String cpf;
    @Column(name = "nivel", nullable = false)
    private Integer nivel;
    @Column(name = "status", nullable = false)
    private Boolean status;
    

   
    public int getId() {
      return id;
    }
    public void setId(Integer id) {
      this.id = id;
    }
    public String getNome() {
      return nome;
    }
    public void setNome(String nome) {
      this.nome = nome;
    }
    public String getEmail() {
      return email;
    }
    public void setEmail(String email) {
      this.email = email;
    }
    public String getSenha() {
      return senha;
    }
    public void setSenha(String senha) {
      this.senha = senha;
    }
    public void setCpf(String cpf) {
       this.cpf = cpf;
     }
    public Integer getNivel() {
      return nivel;
    }
    public void setNivel(Integer nivel) {
      this.nivel = nivel;
    }
    public String getCpf() {
      return cpf;
    }
    public Boolean getStatus() {
      return status;
    }
    public void setStatus(Boolean status) {
      this.status = status;
    }
    
  
  
}
