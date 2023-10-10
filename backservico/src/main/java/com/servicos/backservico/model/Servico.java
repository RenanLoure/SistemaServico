package com.servicos.backservico.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Servico {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nomeCliente;

  @Temporal(TemporalType.DATE)
  private Date dataInicio = new Date();

  @Temporal(TemporalType.DATE)
  private Date dataTermino;

  private String descricao;

  private Double valorServico;

  private Double valorPago;

  @Temporal(TemporalType.DATE)
  private Date dataPagamento;

  private String status; //pendente , realizado, cancelado

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNomeCliente() {
    return nomeCliente;
  }

  public void setNomeCliente(String nomeCliente) {
    this.nomeCliente = nomeCliente;
  }

  public Date getDataInicio() {
    return dataInicio;
  }

  public void setDataInicio(Date dataInicio) {
    this.dataInicio = dataInicio;
  }

  public Date getDataTermino() {
    return dataTermino;
  }

  public void setDataTermino(Date dataTermino) {
    this.dataTermino = dataTermino;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public Double getValorServico() {
    return valorServico;
  }

  public void setValorServico(Double valorServico) {
    this.valorServico = valorServico;
  }

  public Double getValorPago() {
    return valorPago;
  }

  public void setValorPago(Double valorPago) {
    this.valorPago = valorPago;
  }

  public Date getDataPagamento() {
    return dataPagamento;
  }

  public void setDataPagamento(Date dataPagamento) {
    this.dataPagamento = dataPagamento;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }


}
