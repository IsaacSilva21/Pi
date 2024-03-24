package br.com.GamesForYou.GamesForYou.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.model.Produtos;
import br.com.GamesForYou.GamesForYou.repository.IProdutos;

@Service
public class ProdutoService {
    private IProdutos repository;
    
     @Autowired
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
}

