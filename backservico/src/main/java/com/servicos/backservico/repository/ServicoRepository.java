package com.servicos.backservico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.servicos.backservico.model.Servico;

public interface ServicoRepository extends JpaRepository<Servico, Long> {

  @Query("SELECT s FROM Servico s WHERE (s.valorPago IS NULL OR s.valorPago = 0) AND s.status != 'cancelado'")
  List<Servico> buscarServicosPagamentoPendente();

   @Query("select s from Servico s where s.status = 'cancelado'")
  List<Servico> buscarServicosCancelados();

}
