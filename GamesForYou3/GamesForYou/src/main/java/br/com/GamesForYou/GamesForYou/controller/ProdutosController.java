package br.com.GamesForYou.GamesForYou.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.GamesForYou.GamesForYou.model.Produtos;
import br.com.GamesForYou.GamesForYou.service.ProdutoService;

@RestController
@CrossOrigin("*")
@RequestMapping("/produtos")

public class ProdutosController {

    private ProdutoService produtoService;

    public ProdutosController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }
    @GetMapping
    public ResponseEntity<List<Produtos>> listaProdutos(){
        return ResponseEntity.status(200).body(produtoService.listarProdutos());
    }
    @PostMapping
    public ResponseEntity<Produtos> criarProduto(@RequestBody Produtos produtos){
        return ResponseEntity.status(201).body(produtoService.criaProduto(produtos));
    }
    @PutMapping
    public ResponseEntity<Produtos> editarProduto(@RequestBody Produtos produtos){
        return ResponseEntity.status(200).body(produtoService.editarProduto(produtos));
    }

}