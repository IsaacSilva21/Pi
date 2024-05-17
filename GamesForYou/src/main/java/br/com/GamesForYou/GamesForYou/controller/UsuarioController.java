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
import br.com.GamesForYou.GamesForYou.repository.IUsuario;
import br.com.GamesForYou.GamesForYou.service.UsuarioService;
import jakarta.validation.Valid;


@RestController
@CrossOrigin("*")
@RequestMapping("/usuarios")
public class UsuarioController {

 
    private final IUsuario repository;
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService, IUsuario repository) {
        this.usuarioService = usuarioService;
        this.repository = repository;
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
    public Usuario editarUsuario(@PathVariable Integer id, @RequestBody Usuario novoUsuario) {
        return usuarioService.atualizarUsuario(id, novoUsuario);
    }
    
    @PutMapping("/{id}/ativar")
    public ResponseEntity<Usuario> ativarUsuario(@PathVariable Integer id) {
        Usuario usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        
        usuarioExistente.setStatus(true);

        
        Usuario usuarioAtualizado = repository.save(usuarioExistente);

        return ResponseEntity.ok(usuarioAtualizado);
    }

    @PutMapping("/{id}/desativar")
    public ResponseEntity<Usuario> desativarUsuario(@PathVariable Integer id) {
        Usuario usuarioExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        
        usuarioExistente.setStatus(false);

        
        Usuario usuarioAtualizado = repository.save(usuarioExistente);

        return ResponseEntity.ok(usuarioAtualizado);
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
     Integer userId = usuarioService.buscarIdPorEmail(usuario.getEmail());
    Boolean status = usuarioService.verificarStatusUsuario(userId);
    if (!status) {
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
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id) {
        Usuario usuario = usuarioService.buscarUsuarioPorId(id);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    
}
