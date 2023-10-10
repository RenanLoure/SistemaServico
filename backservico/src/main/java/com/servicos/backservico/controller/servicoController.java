package com.servicos.backservico.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.servicos.backservico.model.Servico;
import com.servicos.backservico.service.ServicoService;



@RestController
@RequestMapping("/api/servicos")
public class servicoController {
  
  @Autowired
  private ServicoService servicoService;

  @GetMapping("/")
  public List<Servico> buscarTodos() {
      return servicoService.buscarTodos();
  }

  @GetMapping("/pagamentoPendente")
  public List<Servico> buscarServicosPagamentoPendente(){
    return servicoService.buscarServicosPagamentoPendente();
  }

  @GetMapping("/cancelados")
  public List<Servico> buscarServicosCancelados(){
    return servicoService.buscarServicosCancelados();
  }

  @PostMapping("/{id}")
  public ResponseEntity<Void> cancelar(@PathVariable ("id") Long id){
  servicoService.cancelaServico(id);
  return ResponseEntity.ok().build();
  }
  

  @PostMapping("/")
  public Servico inserir(@RequestBody Servico servico) {
      return servicoService.inserir(servico);
  }

   @PutMapping("/")
  public Servico alterar(@RequestBody Servico servico) {
      return servicoService.alterar(servico);
  }
  
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> excluir(@PathVariable ("id") Long id){
    servicoService.excluir(id);
    return ResponseEntity.ok().build();
  }

}
