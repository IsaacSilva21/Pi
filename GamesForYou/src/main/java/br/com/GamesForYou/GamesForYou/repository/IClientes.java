package br.com.GamesForYou.GamesForYou.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import br.com.GamesForYou.GamesForYou.model.Clientes;


public interface IClientes extends JpaRepository<Clientes, Integer> {
  Clientes findByEmail(String email);
  
}
