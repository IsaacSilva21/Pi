package br.com.GamesForYou.GamesForYou.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.GamesForYou.GamesForYou.DAO.IUsuario;
import br.com.GamesForYou.GamesForYou.model.Usuario;

@RestController
public class UsuarioController {

 @Autowired
 private IUsuario dao;
  @GetMapping("/usuarios")
  public String texto () {
    return "Acessando a api";
  }
}
