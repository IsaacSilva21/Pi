package br.com.GamesForYou.GamesForYou.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
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
  @PutMapping("/{id}")
  public ResponseEntity<Usuario> editarUsuario(@PathVariable("id") Integer id, @Valid @RequestBody Usuario usuario) {
      Usuario usuarioAtualizado = usuarioService.editarUsuario(id, usuario);
      if (usuarioAtualizado != null) {
          return ResponseEntity.ok(usuarioAtualizado);
      } else {
          return ResponseEntity.notFound().build();
      }
  }  
   @PostMapping("/login")
public ResponseEntity<Usuario> validarSenha(@RequestBody Usuario usuario) {
    if (usuario == null || usuario.getEmail() == null || usuario.getSenha() == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    Boolean valid = usuarioService.validarSenha(usuario);
    if (!valid) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    return ResponseEntity.status(HttpStatus.OK).build();
   }
   @ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationException(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
			
		});
		return errors;
	}
}
