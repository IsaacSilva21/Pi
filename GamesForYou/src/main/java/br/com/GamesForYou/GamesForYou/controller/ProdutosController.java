package br.com.GamesForYou.GamesForYou.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.GamesForYou.GamesForYou.model.Produtos;
import br.com.GamesForYou.GamesForYou.repository.IProdutos;

import br.com.GamesForYou.GamesForYou.service.ProdutoService;



@RestController
@CrossOrigin("*")
@RequestMapping("/produtos")

public class ProdutosController {

    private final IProdutos repository;
    private final ProdutoService produtoService;

    public ProdutosController(ProdutoService produtoService, IProdutos repository) {
        this.produtoService = produtoService;
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<Produtos>> listaProdutos(){
        return ResponseEntity.status(200).body(produtoService.listarProdutos());
    }
    
    @PostMapping
    public ResponseEntity<?> criarProduto(@RequestParam("imagem") MultipartFile imagem, @RequestParam("nome") String nome, @RequestParam("valor") BigDecimal valor, @RequestParam("quantidade") Integer quantidade, @RequestParam("avaliacao") Integer avaliacao, @RequestParam("descricao") String descricao, @RequestParam("status") Boolean status) {
        try {
          
            byte[] imagemBytes = imagem.getBytes();
            Produtos produto = new Produtos();
            produto.setNome(nome);
            produto.setValor(valor);
            produto.setQuantidade(quantidade);
            produto.setAvaliacao(avaliacao);
            produto.setDescricao(descricao);
            produto.setStatus(status);
            produto.setImagem(imagemBytes);
            
           
    
            
            Produtos novoProduto = produtoService.criaProduto(produto);
            
            return ResponseEntity.status(201).body(novoProduto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao processar a imagem.");
        }
    }
    @PutMapping("/{id}")
    public Produtos editarProduto(@PathVariable Integer id, @RequestBody Produtos produto) {
        return produtoService.atualizarProduto(id, produto);
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Produtos> ativarProduto(@PathVariable Integer id) {
        Produtos produtoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        produtoExistente.setStatus(true);

        
        Produtos produtoAtualizado = repository.save(produtoExistente);

        return ResponseEntity.ok(produtoAtualizado);
    }

    @PutMapping("/{id}/desativar")
    public ResponseEntity<Produtos> desativarProduto(@PathVariable Integer id) {
        Produtos produtoExistente = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

     
        produtoExistente.setStatus(false);

       
        Produtos produtoAtualizado = repository.save(produtoExistente);

        return ResponseEntity.ok(produtoAtualizado);
    }


    @PutMapping
    public ResponseEntity<Produtos> editarProduto(@RequestBody Produtos produtos){
        return ResponseEntity.status(200).body(produtoService.editarProduto(produtos));
    }
     @PostMapping("/{id}/imagem")
    public ResponseEntity<String> adicionarImagem(@PathVariable Integer id, @RequestParam("imagem") MultipartFile imagem) {
        try {
            produtoService.salvarImagem(id, imagem);
            return ResponseEntity.ok("Imagem adicionada com sucesso.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao adicionar imagem.");
        }
    }

    @GetMapping("/{id}/imagem")
    public ResponseEntity<byte[]> obterImagem(@PathVariable Integer id) {
        byte[] imagem = produtoService.obterImagem(id);
        if (imagem != null) {
            return ResponseEntity.ok(imagem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @GetMapping("/{id}")
public ResponseEntity<Produtos> obterProdutoPorId(@PathVariable Integer id) {
    Produtos produto = produtoService.obterProdutoPorId(id);
    if (produto != null) {
        return ResponseEntity.ok(produto);
    } else {
        return ResponseEntity.notFound().build();
    }
}

}