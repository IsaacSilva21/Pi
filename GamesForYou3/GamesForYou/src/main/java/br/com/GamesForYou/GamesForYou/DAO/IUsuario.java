package br.com.GamesForYou.GamesForYou.DAO;

import org.springframework.data.repository.CrudRepository;

import br.com.GamesForYou.GamesForYou.model.Usuario;

public interface IUsuario extends CrudRepository<Usuario, Integer>{

}
