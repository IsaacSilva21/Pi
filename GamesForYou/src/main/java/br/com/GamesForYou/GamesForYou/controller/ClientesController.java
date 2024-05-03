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

import br.com.GamesForYou.GamesForYou.model.Clientes;
import br.com.GamesForYou.GamesForYou.service.ClientesService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin("*")
@RequestMapping("/clientes")
public class ClientesController {

    private ClientesService clientesService;

    public ClientesController(ClientesService clientesService) {
        this.clientesService = clientesService;
    }

    @GetMapping
    public ResponseEntity<List<Clientes>> listaClientes() {
        return ResponseEntity.status(200).body(clientesService.listarClientes());
    }

    @PostMapping
    public ResponseEntity<Clientes> criarCliente(@Valid @RequestBody Clientes cliente) {
        return ResponseEntity.status(201).body(clientesService.criaCliente(cliente));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Clientes> editarCliente(@PathVariable("id") Integer id, @Valid @RequestBody Clientes cliente) {
        Clientes clienteAtualizado = clientesService.editarCliente(id, cliente);
        if (clienteAtualizado != null) {
            return ResponseEntity.ok(clienteAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/login")
public ResponseEntity<Clientes> validarSenha(@RequestBody Clientes clientes) {
    if (clientes == null || clientes.getEmail() == null || clientes.getSenha() == null) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    Boolean valid = clientesService.validarSenha(clientes);
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
