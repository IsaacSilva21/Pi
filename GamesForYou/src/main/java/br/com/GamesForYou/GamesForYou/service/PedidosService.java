package br.com.GamesForYou.GamesForYou.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.model.Pedidos;
import br.com.GamesForYou.GamesForYou.repository.IPedidos;

@Service
public class PedidosService {
    private IPedidos repository;

    public PedidosService(IPedidos repository) {
        this.repository = repository;
    }


    public List<Pedidos> listarPedidos() {
        return repository.findAll();
    }

 
    public Pedidos criarPedido(Pedidos pedido) {
        return repository.save(pedido);
    }

   
    public Pedidos editarPedido(Integer id, Pedidos pedidoAtualizado) {
        Optional<Pedidos> optionalPedido = repository.findById(id);

        if (optionalPedido.isPresent()) {
            Pedidos pedidoExistente = optionalPedido.get();

            pedidoExistente.setValor(pedidoAtualizado.getValor());
            pedidoExistente.setQuantidade(pedidoAtualizado.getQuantidade());
            pedidoExistente.setCep(pedidoAtualizado.getCep());
            pedidoExistente.setLogradouro(pedidoAtualizado.getLogradouro());
            pedidoExistente.setNumero(pedidoAtualizado.getNumero());
            pedidoExistente.setBairro(pedidoAtualizado.getBairro());
            pedidoExistente.setCidade(pedidoAtualizado.getCidade());
            pedidoExistente.setUf(pedidoAtualizado.getUf());
            pedidoExistente.setStatus(pedidoAtualizado.getStatus());

            return repository.save(pedidoExistente);
        } else {
            return null;
        }
    }

 
    public Pedidos buscarPedidoPorId(Integer id) {
        Optional<Pedidos> optionalPedido = repository.findById(id);
        return optionalPedido.orElse(null);
    }
}
