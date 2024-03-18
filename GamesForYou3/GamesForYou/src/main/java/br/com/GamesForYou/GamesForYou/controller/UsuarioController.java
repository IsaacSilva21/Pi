package br.com.GamesForYou.GamesForYou.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.GamesForYou.GamesForYou.DAO.IUsuario;
import br.com.GamesForYou.GamesForYou.model.Usuario;
import br.com.GamesForYou.GamesForYou.service.UsuarioService;


@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

 @Autowired
 private IUsuario dao;

 private UsuarioService usuarioService;

 public UsuarioController(UsuarioService usuarioService){
      this.usuarioService = usuarioService;
 }

  @GetMapping
  public ResponseEntity<List<Usuario>> listaUsuarios () {
     return ResponseEntity.status(200).body(usuarioService.listarUsuario());
  }

  @PostMapping
  public ResponseEntity<Usuario> criarUsuario(@RequestBody Usuario usuario){
     return ResponseEntity.status(201).body(usuarioService.criaUsuario(usuario));
  }
  @PutMapping
  public ResponseEntity<Usuario> editarUsuario(@RequestBody Usuario usuario) {
      Usuario usuarioNovo = dao.save(usuario);
      return ResponseEntity.status(201).body(usuarioNovo);
  }
  
}
