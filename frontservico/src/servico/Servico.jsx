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
          {/* <div class="input-container">
            <input placeholder="Nome" className="input-field" type="text" />
            <label for="input-field" className="input-label">Nome</label>
            <span className="input-highlight"></span>
          </div> */}
          <div>
            <label className="form-label">Nome do cliente</label>
            <input onChange={handleChange} value={servico.nomeCliente || ''} type="text" name="nomeCliente" className="form-control" />
          </div>
          <div>
            <label className="form-label">Data de início</label>
            <input onChange={handleChange} value={servico.dataInicio || ''} type="date" name="dataInicio" className="form-control" />
          </div>
          <div>
            <label className="form-label">Data de Termino</label>
            <input onChange={handleChange} value={servico.dataTermino || ''} type="date" name="dataTermino" className="form-control" />
          </div>
          <div>
            <label className="form-label">Descrição do serviço</label>
            <input onChange={handleChange} value={servico.descricao || ''} type="text" name="descricao" className="form-control" />
          </div>
          <div>
            <label className="form-label">Valor do Serviço</label>
            <input onChange={handleChange} value={servico.valorServico || ''} type="number" name="valorServico" className="form-control" />
          </div>
          <div>
            <label className="form-label">Valor Pago</label>
            <input onChange={handleChange} value={servico.valorPago || ''} type="number" name="valorPago" className="form-control" />
          </div>
          <div>
            <label className="form-label">Data de Pagamento</label>
            <input onChange={handleChange} value={servico.dataPagamento || ''} type="date" name="dataPagamento" className="form-control" />
          </div>
          <br />
          <input type="submit" className='btn btn-success' value="Cadastrar" />

        </div>
      </form>
      <hr /><hr />


      <button onClick={buscarTodos} className='btn btn-primary'>Listar todos</button>
      <button onClick={buscarPagamentosPendentes} className='btn btn-secondary'>Pagamentos Pendentes</button>
      <button onClick={buscarCancelados} className='btn btn-success'>Serviços Cancelados</button>

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
                    <button onClick={() => excluir(serv.id)} className='btn btn-danger'>Excluir</button>
                  }&nbsp;&nbsp;
                  {serv.status != 'cancelado' &&
                    <button onClick={() => setServico(serv)} className='btn btn-primary'>Alterar</button>
                  }&nbsp;&nbsp;
                  <button onClick={() => cancelar(serv.id)} className='btn btn-warning'>Cancelar</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default Servico;
