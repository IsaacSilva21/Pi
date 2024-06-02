package br.com.GamesForYou.GamesForYou.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.GamesForYou.GamesForYou.model.Pedidos;
import br.com.GamesForYou.GamesForYou.service.PedidosService;

@RestController
@CrossOrigin("*")
@RequestMapping("/pedidos")
public class PedidosController {

    private final PedidosService pedidosService;

    public PedidosController(PedidosService pedidosService) {
        this.pedidosService = pedidosService;
    }

    
    @GetMapping
    public ResponseEntity<List<Pedidos>> listarPedidos() {
        List<Pedidos> lista = pedidosService.listarPedidos();
        return ResponseEntity.ok(lista);
    }

    
    @PostMapping
    public ResponseEntity<Pedidos> criarPedido(@RequestBody Pedidos pedido) {
        Pedidos novoPedido = pedidosService.criarPedido(pedido);
        return ResponseEntity.status(201).body(novoPedido);
    }

  
    @PutMapping("/{id}")
    public ResponseEntity<Pedidos> editarPedido(@PathVariable Integer id, @RequestBody Pedidos pedidoAtualizado) {
        Pedidos pedidoEditado = pedidosService.editarPedido(id, pedidoAtualizado);
        if (pedidoEditado != null) {
            return ResponseEntity.ok(pedidoEditado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedidos> buscarPedidoPorId(@PathVariable Integer id) {
        Pedidos pedido = pedidosService.buscarPedidoPorId(id);
        if (pedido != null) {
            return ResponseEntity.ok(pedido);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    // Activate an order
    @PutMapping("/{id}/ativar")
    public ResponseEntity<Pedidos> ativarPedido(@PathVariable Integer id) {
        Pedidos pedidoExistente = pedidosService.buscarPedidoPorId(id);
        if (pedidoExistente != null) {
            pedidoExistente.setStatus("Ativo");
            Pedidos pedidoAtualizado = pedidosService.criarPedido(pedidoExistente); // save the updated order
            return ResponseEntity.ok(pedidoAtualizado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }

    // Deactivate an order
    @PutMapping("/{id}/desativar")
    public ResponseEntity<Pedidos> desativarPedido(@PathVariable Integer id) {
        Pedidos pedidoExistente = pedidosService.buscarPedidoPorId(id);
        if (pedidoExistente != null) {
            pedidoExistente.setStatus("Inativo");
            Pedidos pedidoAtualizado = pedidosService.criarPedido(pedidoExistente); // save the updated order
            return ResponseEntity.ok(pedidoAtualizado);
        } else {
            return ResponseEntity.status(404).build();
        }
    }
}
