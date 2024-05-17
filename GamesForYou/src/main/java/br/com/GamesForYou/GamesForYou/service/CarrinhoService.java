package br.com.GamesForYou.GamesForYou.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.com.GamesForYou.GamesForYou.model.Carrinho;
import br.com.GamesForYou.GamesForYou.repository.ICarrinho;

@Service
public class CarrinhoService {
    private ICarrinho repository;

    public CarrinhoService(ICarrinho repository) {
        this.repository = repository;
    }

    public List<Carrinho> listarCarrinho() {
        List<Carrinho> lista = repository.findAll(); 
        return lista;
    }

    public Carrinho criaCarrinho(Carrinho carrinho) {
        Carrinho carrinhoNovo = repository.save(carrinho); 
        return carrinhoNovo;
    }
    public Carrinho atualizarItemCarrinho(Integer id, Carrinho novoItemCarrinho) {
      Carrinho itemExistente = repository.findById(id)
          .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado"));

      itemExistente.setNome(novoItemCarrinho.getNome());
      itemExistente.setValor(novoItemCarrinho.getValor());
      

      return repository.save(itemExistente);
  }

  public void salvarImagemDoItemCarrinho(Integer id, MultipartFile imagem) throws IOException {
      Carrinho itemCarrinho = repository.findById(id)
          .orElseThrow(() -> new IllegalArgumentException("Item do carrinho não encontrado"));

      itemCarrinho.setImagem(imagem.getBytes());
      repository.save(itemCarrinho);
  }

  public byte[] obterImagemDoItemCarrinho(Integer id) {
      Carrinho itemCarrinho = repository.findById(id)
          .orElseThrow(() -> new IllegalArgumentException("Item do carrinho não encontrado"));

      return itemCarrinho.getImagem();
  }


  public Carrinho obterItemCarrinhoPorId(Integer id) {
      return repository.findById(id).orElse(null);
  }

  public void excluirItemCarrinho(Integer id) {
      repository.deleteById(id);
  }
}
