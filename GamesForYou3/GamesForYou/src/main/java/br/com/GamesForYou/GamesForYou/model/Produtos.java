package br.com.GamesForYou.GamesForYou.model;

import org.springframework.boot.autoconfigure.web.WebProperties.Resources.Chain.Strategy;
import org.springframework.cglib.core.GeneratorStrategy;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "produtos") 
public class Produtos {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "id")

private Integer id;
    @Column(name = "nomeProduto", length = 50, nullable = true)
    private String nome;
    
    public Integer getId() {
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
   
}
