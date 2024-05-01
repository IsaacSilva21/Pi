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
public Usuario editarUsuario(Usuario usuario){
  String encoder = this.passwordEncoder.encode(usuario.getSenha());
  usuario.setSenha(encoder);
  Usuario usuarioNovo = repository.save(usuario);
  return usuarioNovo;
}

public Usuario atualizarUsuario(Integer id, Usuario novoUsuario) {
    // Buscar o usuário existente no banco de dados pelo ID
    Usuario usuarioExistente = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

    usuarioExistente.setNome(novoUsuario.getNome());
    usuarioExistente.setCpf(novoUsuario.getCpf());
    
    // Codificar a nova senha antes de definir
    String senhaCodificada = this.passwordEncoder.encode(novoUsuario.getSenha());
    usuarioExistente.setSenha(senhaCodificada);

    // Atualizar o nível (ou outros campos)
    usuarioExistente.setNivel(novoUsuario.getNivel());

    // Salvar o usuário atualizado no banco de dados
    return repository.save(usuarioExistente);
}

public Boolean validarSenha(Usuario usuario) {
        
        Usuario usuarioExistente = repository.findByEmail(usuario.getEmail());

        
        if (usuarioExistente != null && passwordEncoder.matches(usuario.getSenha(), usuarioExistente.getSenha())) {
            return true; 
        } else {
            return false; 
        }
    }
    public Integer buscarIdPorEmail(String email) {
        Usuario usuario = repository.findByEmail(email);
        if (usuario != null) {
            return usuario.getId();
        } else {
            throw new IllegalArgumentException("Usuário não encontrado para o e-mail fornecido");
        }
    }

    public Boolean verificarStatusUsuario(Integer id) {
        Optional<Usuario> optionalUsuario = repository.findById(id);

        if (optionalUsuario.isPresent()) {
            Usuario usuario = optionalUsuario.get();
            return usuario.getStatus(); 
        } else {
            throw new IllegalArgumentException("Usuário não encontrado para o ID fornecido");
        }
    }

    public Usuario buscarUsuarioPorId(Integer id) {
        return repository.findById(id).orElse(null);
    }
}
