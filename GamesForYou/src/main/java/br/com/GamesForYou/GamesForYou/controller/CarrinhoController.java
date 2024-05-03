package br.com.GamesForYou.GamesForYou.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.GamesForYou.GamesForYou.model.Carrinho;
import br.com.GamesForYou.GamesForYou.service.CarrinhoService;

@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    private final CarrinhoService carrinhoService;

    public CarrinhoController(CarrinhoService carrinhoService) {
        this.carrinhoService = carrinhoService;
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Carrinho>> listarCarrinho() {
        List<Carrinho> itensCarrinho = carrinhoService.listarCarrinho();
        return ResponseEntity.ok(itensCarrinho);
    }

    @PostMapping("/criar")
    public ResponseEntity<Carrinho> criarCarrinho(@RequestBody Carrinho carrinho) {
        Carrinho carrinhoNovo = carrinhoService.criaCarrinho(carrinho);
        return ResponseEntity.status(HttpStatus.CREATED).body(carrinhoNovo);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Carrinho> atualizarItemCarrinho(@PathVariable Integer id, @RequestBody Carrinho novoItemCarrinho) {
        Carrinho itemAtualizado = carrinhoService.atualizarItemCarrinho(id, novoItemCarrinho);
        return ResponseEntity.ok(itemAtualizado);
    }

    @PostMapping("/{id}/imagem")
    public ResponseEntity<String> salvarImagemDoItemCarrinho(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) {
        try {
            carrinhoService.salvarImagemDoItemCarrinho(id, imagem);
            return ResponseEntity.ok("Imagem salva com sucesso.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar imagem.");
        }
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> obterImagemDoItemCarrinho(@PathVariable Integer id) {
        byte[] imagem = carrinhoService.obterImagemDoItemCarrinho(id);
        return ResponseEntity.ok(imagem);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrinho> obterItemCarrinhoPorId(@PathVariable Integer id) {
        Carrinho itemCarrinho = carrinhoService.obterItemCarrinhoPorId(id);
        if (itemCarrinho != null) {
            return ResponseEntity.ok(itemCarrinho);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirItemCarrinho(@PathVariable Integer id) {
        carrinhoService.excluirItemCarrinho(id);
        return ResponseEntity.noContent().build();
    }
}
