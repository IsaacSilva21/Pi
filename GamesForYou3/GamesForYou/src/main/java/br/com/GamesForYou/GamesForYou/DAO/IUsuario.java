package br.com.GamesForYou.GamesForYou.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import br.com.GamesForYou.GamesForYou.model.Usuario;

public interface IUsuario extends JpaRepository<Usuario, Integer>{

}
