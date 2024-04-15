package br.com.GamesForYou.GamesForYou.repository;


import org.springframework.data.jpa.repository.JpaRepository;


import br.com.GamesForYou.GamesForYou.model.Usuario;

public interface IUsuario extends JpaRepository<Usuario, Integer>{
  Usuario findByEmail(String email);
}
