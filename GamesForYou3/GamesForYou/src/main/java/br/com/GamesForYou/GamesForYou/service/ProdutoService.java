package br.com.GamesForYou.GamesForYou.service;

import java.util.List;

import br.com.GamesForYou.GamesForYou.model.Produtos;
import br.com.GamesForYou.GamesForYou.repository.IProdutos;

public class ProdutoService {
    private IProdutos repository;

    public List<Produtos> listarProdutos(){
        List<Produtos> lista = repository.findAll();
        return lista;
}
public Produtos criaProduto(Produtos produtos){
  Produtos produtoNovo = repository.save(produtos);
  return produtoNovo;
}
public Produtos editarProduto(Produtos produtos){
  Produtos produtoNovo = repository.save(produtos);
  return produtoNovo;
}
}

