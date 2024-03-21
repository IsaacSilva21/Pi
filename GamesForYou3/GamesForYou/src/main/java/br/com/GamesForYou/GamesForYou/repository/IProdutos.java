package br.com.GamesForYou.GamesForYou.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.GamesForYou.GamesForYou.model.Produtos;

public interface IProdutos extends JpaRepository<Produtos, Integer>{

}
