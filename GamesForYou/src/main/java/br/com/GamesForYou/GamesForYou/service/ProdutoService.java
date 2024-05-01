package br.com.GamesForYou.GamesForYou.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.GamesForYou.GamesForYou.model.Produtos;
import br.com.GamesForYou.GamesForYou.repository.IProdutos;

@Service
public class ProdutoService {
    private IProdutos repository;
     
    public ProdutoService(IProdutos repository) {
      this.repository = repository;
    }
    public List<Produtos> listarProdutos(){
        List<Produtos> lista = repository.findAll();
        return lista;
}
public Produtos criaProduto(Produtos produtos){
  Produtos produtosNovos = repository.save(produtos);
  return produtosNovos;
}
public Produtos editarProduto(Produtos produtos){
  Produtos produtosNovos = repository.save(produtos);
  return produtosNovos;
}

public Produtos atualizarProduto(Integer id, Produtos novoProdutos) {
    Produtos produtosExistente = repository.findById(id)
.orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

  produtosExistente.setNome(novoProdutos.getNome());
  produtosExistente.setValor(novoProdutos.getValor());
  produtosExistente.setQuantidade(novoProdutos.getQuantidade());
  produtosExistente.setAvaliacao(novoProdutos.getAvaliacao());
  produtosExistente.setDescricao(novoProdutos.getDescricao());

    return repository.save(produtosExistente);
}

   public void salvarImagem(Integer id, MultipartFile imagem) throws IOException {
        Produtos produto = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        produto.setImagem(imagem.getBytes());
        repository.save(produto);
    }

    public byte[] obterImagem(Integer id) {
        Produtos produto = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Produto não encontrado"));
        return produto.getImagem();
    }

    public Produtos obterProdutoPorId(Integer id) {
      return repository.findById(id).orElse(null);
  }
}

