package br.com.GamesForYou.GamesForYou.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.GamesForYou.GamesForYou.DAO.IUsuario;
import br.com.GamesForYou.GamesForYou.model.Usuario;


@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

 @Autowired
 private IUsuario dao;

  @GetMapping
  public List<Usuario> listaUsuarios () {
    return (List<Usuario>) dao.findAll();
  }

  @PostMapping
  public Usuario criarUsuario(@RequestBody Usuario usuario){
    Usuario usuarioNovo = dao.save(usuario);
     return usuarioNovo;
  }
  @PutMapping
  public Usuario editarUsuario(@RequestBody Usuario usuario) {
      Usuario usuarioNovo = dao.save(usuario);
      return usuarioNovo;
  }
  
}
