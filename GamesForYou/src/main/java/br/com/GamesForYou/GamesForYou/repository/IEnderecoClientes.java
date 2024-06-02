package br.com.GamesForYou.GamesForYou.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.GamesForYou.GamesForYou.model.EnderecoClientes;


public interface IEnderecoClientes extends JpaRepository<EnderecoClientes, Integer> {
  
}