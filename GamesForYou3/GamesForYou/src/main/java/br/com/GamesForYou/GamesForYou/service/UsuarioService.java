package br.com.GamesForYou.GamesForYou.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.model.Usuario;
import br.com.GamesForYou.GamesForYou.repository.IUsuario;

@Service
public class UsuarioService {
        private IUsuario repository;
        private PasswordEncoder passwordEncoder;

        public UsuarioService(IUsuario repository){
            this.repository = repository;
            this.passwordEncoder = new BCryptPasswordEncoder();
        }
        public List<Usuario> listarUsuario(){
          List<Usuario> lista = repository.findAll();
          return lista;
}
public Usuario criaUsuario(Usuario usuario){
  String encoder = this.passwordEncoder.encode(usuario.getSenha());
  usuario.setSenha(encoder);
  Usuario usuarioNovo = repository.save(usuario);
  return usuarioNovo;
}
public Usuario editarUsuario(Usuario usuario){
  String encoder = this.passwordEncoder.encode(usuario.getSenha());
  usuario.setSenha(encoder);
  Usuario usuarioNovo = repository.save(usuario);
  return usuarioNovo;
}
public Boolean validarSenha(Usuario usuario) {
      
        Usuario usuarioExistente = repository.findByEmail(usuario.getEmail());

        
        if (usuarioExistente != null && passwordEncoder.matches(usuario.getSenha(), usuarioExistente.getSenha())) {
            return true; 
        } else {
            return false; 
        }
    }
}
