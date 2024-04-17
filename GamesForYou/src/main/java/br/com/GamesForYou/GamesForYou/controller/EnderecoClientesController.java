
  package br.com.GamesForYou.GamesForYou.controller;

  import java.util.List;
  
  import org.springframework.http.HttpStatus;
  import org.springframework.http.ResponseEntity;
  import org.springframework.web.bind.annotation.*;
  
  import br.com.GamesForYou.GamesForYou.model.EnderecoClientes;
  import br.com.GamesForYou.GamesForYou.service.EnderecoClientesService;
  
  @RestController
  @RequestMapping("/enderecos-clientes")
  public class EnderecoClientesController {
      private EnderecoClientesService enderecoClientesService;
  
      public EnderecoClientesController(EnderecoClientesService enderecoClientesService) {
          this.enderecoClientesService = enderecoClientesService;
      }
  
      @GetMapping
      public ResponseEntity<List<EnderecoClientes>> listarEnderecosClientes() {
          List<EnderecoClientes> enderecosClientes = enderecoClientesService.listarEnderecosClientes();
          return ResponseEntity.ok().body(enderecosClientes);
      }
  
      @PostMapping
      public ResponseEntity<EnderecoClientes> criarEnderecoCliente(@RequestBody EnderecoClientes enderecoCliente) {
          EnderecoClientes novoEnderecoCliente = enderecoClientesService.criarEnderecoCliente(enderecoCliente);
          return ResponseEntity.status(HttpStatus.CREATED).body(novoEnderecoCliente);
      }
  
      @PutMapping("/{id}")
   public ResponseEntity<EnderecoClientes> editarEnderecoCliente(@PathVariable Integer id, @RequestBody EnderecoClientes enderecoClienteAtualizado) {
    EnderecoClientes enderecoClienteAtualizadoResultado = enderecoClientesService.editarEnderecoCliente(id, enderecoClienteAtualizado);
    if (enderecoClienteAtualizadoResultado != null) {
        return ResponseEntity.ok().body(enderecoClienteAtualizadoResultado);
    } else {
        return ResponseEntity.notFound().build();
    }
}
  
      @DeleteMapping("/{id}")
      public ResponseEntity<Void> deletarEnderecoCliente(@PathVariable Integer id) {
          enderecoClientesService.deletarEnderecoCliente(id);
          return ResponseEntity.noContent().build();
      }
  }

