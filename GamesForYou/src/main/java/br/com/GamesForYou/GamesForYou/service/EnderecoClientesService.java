package br.com.GamesForYou.GamesForYou.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.GamesForYou.GamesForYou.model.EnderecoClientes;
import br.com.GamesForYou.GamesForYou.repository.IEnderecoClientes;

@Service
public class EnderecoClientesService {
    private IEnderecoClientes repository;

    public EnderecoClientesService(IEnderecoClientes repository) {
        this.repository = repository;
    }

    public List<EnderecoClientes> listarEnderecosClientes() {
        List<EnderecoClientes> lista = repository.findAll();
        return lista;
    }

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
