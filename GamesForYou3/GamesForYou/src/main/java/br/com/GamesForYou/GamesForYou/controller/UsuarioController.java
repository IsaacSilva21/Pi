package br.com.GamesForYou.GamesForYou.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.GamesForYou.GamesForYou.model.Usuario;

import br.com.GamesForYou.GamesForYou.service.UsuarioService;
import jakarta.validation.Valid;


@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

 

 private UsuarioService usuarioService;

 public UsuarioController(UsuarioService usuarioService){
      this.usuarioService = usuarioService;
 }

  @GetMapping
  public ResponseEntity<List<Usuario>> listaUsuarios () {
     return ResponseEntity.status(200).body(usuarioService.listarUsuario());
  }

  @PostMapping
  public ResponseEntity<Usuario> criarUsuario(@Valid @RequestBody Usuario usuario){
     return ResponseEntity.status(201).body(usuarioService.criaUsuario(usuario));
  }
  @PutMapping
  public ResponseEntity<Usuario> editarUsuario(@Valid @RequestBody Usuario usuario) {
      return ResponseEntity.status(200).body(usuarioService.editarUsuario(usuario));
  }
   @PostMapping("/login")
   public ResponseEntity<Usuario> validarSenha(@Valid @RequestBody Usuario usuario){
         Boolean valid = usuarioService.validarSenha(usuario);
         if(!valid){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
         }
         return ResponseEntity.status(200).build();
   }
}
