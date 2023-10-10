import './Servico.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Servico() {

  const [servico, setServico] = useState({
    valorServico: '',
    nomeCliente: '',
    dataInicio: '',
    dataTermino: '',
    descricao: '',
    valorPago: '',
    dataPagamento: ''
  });

  const [servicos, setServicos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar]);

  function handleChange(event) {
    setServico({ ...servico, [event.target.name]: event.target.value });
  }

  function limparCampos(params) {
    setServico({

      valorServico: '',
      nomeCliente: '',
      dataInicio: '',
      dataTermino: '',
      descricao: '',
      valorPago: '',
      dataPagamento: ''
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (servico.id == undefined) {
      axios.post("http://localhost:8087/api/servicos/", servico).then(result => {
        setAtualizar(result)
        console.log(result);
      });
    } else {
      axios.put("http://localhost:8087/api/servicos/", servico).then(result => {
        setAtualizar(result)
        console.log(result);
      });
    }
    limparCampos();
  }

  function buscarTodos(params) {
    axios.get("http://localhost:8087/api/servicos/").then(result => {
      setServicos(result.data);
    });
  }

  function buscarPagamentosPendentes(params) {
    axios.get("http://localhost:8087/api/servicos/pagamentoPendente").then(result => {
      setServicos(result.data);
    });
  }

  function buscarCancelados(params) {
    axios.get("http://localhost:8087/api/servicos/cancelados").then(result => {
      setServicos(result.data);
    });
  }

  function excluir(id) {
    axios.delete("http://localhost:8087/api/servicos/" + id).then(result => {
      setAtualizar(result)
    });
  }

  function cancelar(id) {
    axios.post("http://localhost:8087/api/servicos/" + id).then(result => {
      setAtualizar(result)
    });
  }

  return (
    <div className="container">
      <h1>Cadastro de serviços</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-6">
          <div class="input-container">
            <input onChange={handleChange} value={servico.nomeCliente || ''} name="nomeCliente" placeholder="Nome" className="input-field" type="text" />
            <label for="input-field" className="input-label">Nome</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio" className="input-field" type="date" />
            <label for="input-field" className="input-label">Data de início</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino" className="input-field" type="date" />
            <label for="input-field" className="input-label">Data de Termino</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.descricao || ''} name="descricao" placeholder="Descrição do serviço" className="input-field" type="text" />
            <label for="input-field" className="input-label">Descrição do serviço</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.valorServico || ''} name="valorServico" placeholder="Valor do Serviço" className="input-field" type="number" />
            <label for="input-field" className="input-label">Valor do Serviço</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.valorPago || ''} name="valorPago" placeholder="Valor Pago" className="input-field" type="number" />
            <label for="input-field" className="input-label">Valor Pago</label>
            <span className="input-highlight"></span>
          </div>
          <div class="input-container">
            <input onChange={handleChange} value={servico.dataPagamento || ''} placeholder="Data de Pagamento" name="dataPagamento" className="input-field" type="date" />
            <label for="input-field" className="input-label">Data de Pagamento</label>
            <span className="input-highlight"></span>
          </div>
          <br />
          <input type="submit" className='button' value="Cadastrar" />

        </div>
      </form>
      <hr /><hr />

      <br />
      <button onClick={buscarTodos} className='listar'>Listar todos</button>&nbsp;&nbsp;
      <button onClick={buscarPagamentosPendentes} className='listarPendentes'>Pagamentos Pendentes</button>&nbsp;&nbsp;
      <button onClick={buscarCancelados} className='ListarCancelados'>Serviços Cancelados</button>&nbsp;&nbsp;
      <br />
      <br />

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Status</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {
            servicos.map(serv => (
              <tr key={serv.id}>
                <td>{serv.nomeCliente}</td>
                <td>{serv.descricao}</td>
                <td>{serv.valorServico}</td>
                <td>{serv.status}</td>
                <td>
                  {serv.status != 'cancelado' &&
                    <button onClick={() => excluir(serv.id)} className='excluir'>Excluir</button>
                  }&nbsp;&nbsp;
                  {serv.status != 'cancelado' &&
                    <button onClick={() => setServico(serv)} className='listar'>Alterar</button>
                  }&nbsp;&nbsp;
                  <button onClick={() => cancelar(serv.id)} className='ListarCancelados'>Cancelar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default Servico;
