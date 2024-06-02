package br.com.GamesForYou.GamesForYou.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.model.EnderecoClientes;
import br.com.GamesForYou.GamesForYou.repository.IEnderecoClientes;

@Service
public class EnderecoClientesService {
    private final IEnderecoClientes repository;

    public EnderecoClientesService(IEnderecoClientes repository) {
        this.repository = repository;
    }

    public List<EnderecoClientes> listarEnderecosPorIdCliente(Integer idCliente) {
        List<EnderecoClientes> enderecosPorIdCliente = new ArrayList<>();
        List<EnderecoClientes> todosEnderecos = repository.findAll();
        for (EnderecoClientes endereco : todosEnderecos) {
            if (endereco.getId_cliente().equals(idCliente)) { // Aqui está usando getId_cliente()
                enderecosPorIdCliente.add(endereco);
            }
        }
        return enderecosPorIdCliente;
    }
    // outros métodos do serviço...




    public EnderecoClientes criarEnderecoCliente(EnderecoClientes enderecoCliente) {
        EnderecoClientes enderecoClienteNovo = repository.save(enderecoCliente);
        return enderecoClienteNovo;
    }

    public EnderecoClientes editarEnderecoCliente(Integer id, EnderecoClientes enderecoClienteAtualizado) {
        Optional<EnderecoClientes> optionalEnderecoCliente = repository.findById(id);

        if (optionalEnderecoCliente.isPresent()) {
            EnderecoClientes enderecoClienteExistente = optionalEnderecoCliente.get();

            enderecoClienteExistente.setCep(enderecoClienteAtualizado.getCep());
            enderecoClienteExistente.setLogradouro(enderecoClienteAtualizado.getLogradouro());
            enderecoClienteExistente.setNumero(enderecoClienteAtualizado.getNumero());
            enderecoClienteExistente.setComplemento(enderecoClienteAtualizado.getComplemento());
            enderecoClienteExistente.setBairro(enderecoClienteAtualizado.getBairro());
            enderecoClienteExistente.setCidade(enderecoClienteAtualizado.getCidade());
            enderecoClienteExistente.setUf(enderecoClienteAtualizado.getUf());

            EnderecoClientes enderecoClienteSalvo = repository.save(enderecoClienteExistente);
            return enderecoClienteSalvo;
        } else {
            return null;
        }
    }

    public void deletarEnderecoCliente(Integer id) {
        repository.deleteById(id);
    }
}
