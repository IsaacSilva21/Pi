package br.com.GamesForYou.GamesForYou.service;

import java.util.List;
import java.util.Optional;

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
public Usuario editarUsuario(Integer id, Usuario usuarioAtualizado){
  // Encontra o usuário pelo ID
  Optional<Usuario> optionalUsuario = repository.findById(id);
    
  // Verifica se o usuário foi encontrado
  if (optionalUsuario.isPresent()) {
      Usuario usuarioExistente = optionalUsuario.get();
      
      // Atualiza apenas os campos permitidos
      usuarioExistente.setNome(usuarioAtualizado.getNome());
      usuarioExistente.setCpf(usuarioAtualizado.getCpf());
      usuarioExistente.setNivel(usuarioAtualizado.getNivel());
      
      // Verifica se o status é válido e atualiza apenas se for 'true' ou 'false'
      Boolean status = usuarioAtualizado.getStatus();
      if (status != null) {
          usuarioExistente.setStatus(status);
      }
      
      // Re-hashing da senha, caso seja fornecida uma nova senha no objeto usuarioAtualizado
      String novaSenha = usuarioAtualizado.getSenha();
      if (novaSenha != null) {
          String encoder = this.passwordEncoder.encode(novaSenha);
          usuarioExistente.setSenha(encoder);
      }
      
      // Salva o usuário atualizado no banco de dados
      Usuario usuarioSalvo = repository.save(usuarioExistente);
      return usuarioSalvo;
  } else {
      // Usuário não encontrado, trate isso adequadamente
      return null;
  }
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
