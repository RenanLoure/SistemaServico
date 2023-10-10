package com.servicos.backservico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servicos.backservico.model.Servico;
import com.servicos.backservico.repository.ServicoRepository;

@Service
public class ServicoService {

  @Autowired
  private ServicoRepository servicoRepository;

  public List<Servico> buscarTodos(){
    return servicoRepository.findAll();
  }

  public List<Servico> buscarServicosPagamentoPendente(){
    return servicoRepository.buscarServicosPagamentoPendente();
  }

  public List<Servico> buscarServicosCancelados(){
    return servicoRepository.buscarServicosCancelados();
  }

  public Servico inserir(Servico servico){
    if (servico.getValorPago() == null || servico.getValorPago() == 0 || servico.getDataPagamento() == null) {
      servico.setStatus("Pendente");
    } else {
      servico.setStatus("Realizado");
    }
    return servicoRepository.save(servico);
  }

  public Servico alterar(Servico servico){

    if (servico.getValorPago() != null && servico.getValorPago() >= 0 || servico.getDataPagamento() != null) {
      servico.setStatus("Realizado");
    }

    return servicoRepository.saveAndFlush(servico);
  }

  public void cancelaServico(Long id){
    Servico servico = servicoRepository.findById(id).get();
    servico.setStatus("cancelado");
    servicoRepository.save(servico);
  }

  public void excluir(Long id){
    Servico servico = servicoRepository.findById(id).get();
    servicoRepository.delete(servico);
  }
}
