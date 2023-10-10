package com.servicos.backservico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.servicos.backservico.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

  @Query("select s from Servico s where s.valorPago IS NOT NULL")
  List<Servico> buscarServicosPagamentoPendente();

   @Query("select s from Servico s where s.status = 'cancelado'")
  List<Servico> buscarServicosCancelados();
  
}
