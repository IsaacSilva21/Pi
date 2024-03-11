package com.GamesForYou2.GamesForYou.entidades;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_departamento")
public class Departamento {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long Id;
  private String nome;
  
  public Departamento() {
  }

  public Long getId() {
    return Id;
  }

  public void setId(Long id) {
    Id = id;
  }

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }


  
}
