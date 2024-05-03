package br.com.GamesForYou.GamesForYou.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.GamesForYou.GamesForYou.model.Carrinho;


public interface ICarrinho extends JpaRepository<Carrinho, Integer> {
  

}
