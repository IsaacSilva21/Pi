package br.com.GamesForYou.GamesForYou.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.DAO.IUsuario;
import br.com.GamesForYou.GamesForYou.model.Usuario;

@Service
public class UsuarioService {
        private IUsuario repository;

        public UsuarioService(IUsuario repository){
            this.repository = repository;
        }
        public List<Usuario> listarUsuario(){
          List<Usuario> lista = repository.findAll();
          return lista;
}
public Usuario criaUsuario(Usuario usuario){
  Usuario usuarioNovo = repository.save(usuario);
  return usuarioNovo;
}
}
