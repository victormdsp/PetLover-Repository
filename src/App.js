import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cep: ' ',
      contadorBusca: 0
    };

    /* Bind das funções utilizadas */
    this.setCep = this.setCep.bind(this);
    this.setContadorBusca = this.setContadorBusca.bind(this);
  }

  /* Seta o contador para saber se alguma busca ja foi feita */
  setContadorBusca() {
    this.setState({ contadorBusca: 1 })
  };

  /* Seta o valor do Cep digitado pelo usuário */
  setCep(event) {
    this.setState({ cep: event.target.value });
  };

  /* Função que trabalha toda a parte responsiva do JavaScript */
  ReponsiveJS(response) {
    const appDiv = document.getElementById('App');

    if(parseInt(this.state.contadorBusca) > 0) {
      let teste = document.getElementById('informationCep')
      appDiv.removeChild(teste);
    }

    /* Chama função para setar o contador > 0 */
    this.setContadorBusca();

    /* Criação e atribuição de uma id para a div das informações no JS responsivo */
    const info = document.createElement('div');
    info.id = 'informationCep';

    /* Criação das variáveis utilizadas no JS Responsivo */
    let ul = document.createElement('ul');

    let h1Cep = document.createElement('h1');
    let h1Estado = document.createElement('h1');
    let h1Localidade = document.createElement('h1');
    let h1Logradouro = document.createElement('h1');

    let liCep = document.createElement('li');
    let liEstado = document.createElement('li');
    let liLocalidade = document.createElement('li');
    let liLogradouro = document.createElement('li');

    /* Criação de Id e classeName para as listas */
    ul.id = 'listInfo';

    liCep.className = 'information';
    liEstado.className = 'information';
    liLocalidade.className = 'information';
    liLogradouro.className = 'information';

    h1Cep.innerHTML = 'Cep: '
    h1Estado.innerHTML = 'Estado: '
    h1Localidade.innerHTML = 'Cidade: '
    h1Logradouro.innerHTML = 'Logradouro: '

    /* Append dos textos das informações buscadas */
    liCep.appendChild(h1Cep);
    liCep.appendChild(document.createTextNode(response.cep));

    liEstado.appendChild(h1Estado);
    liEstado.appendChild(document.createTextNode(response.uf));

    liLocalidade.appendChild(h1Localidade);
    liLocalidade.appendChild(document.createTextNode(response.localidade));

    liLogradouro.appendChild(h1Logradouro);
    liLogradouro.appendChild(document.createTextNode(response.logradouro));

    /* Append final de todas as alterações feitas */
    info.appendChild(ul);
    ul.appendChild(liCep);
    ul.appendChild(liEstado);
    ul.appendChild(liLocalidade);
    ul.appendChild(liLogradouro);
    appDiv.appendChild(info);
  }

  printErro(){
    const appDiv = document.getElementById('App');

    if(parseInt(this.state.contadorBusca) > 0) {
      let teste = document.getElementById('informationCep')
      appDiv.removeChild(teste);
    }

    /* Chama função para setar o contador > 0 */
    this.setContadorBusca();

    /* Criação e atribuição de uma id para a div das informações no JS responsivo */
    const info = document.createElement('div');
    info.id = 'informationCep';

    /* Criação das variáveis utilizadas no JS Responsivo */
    let ul = document.createElement('ul');
    let h1 = document.createElement('h1');
    
    /* Atribuição das ids, a id do ul se mantém a mesma para não ser necessário fazer alterações. */
    ul.id = 'listInfo';
    h1.id = 'erroPrint';

    h1.innerHTML = 'Cep inválido , verifique se digitou corretamente!';

    // Append das tags
    ul.appendChild(h1);
    info.appendChild(ul);
    appDiv.appendChild(info);
  }

  /* Função que busca e verifica se o cep digitado existe e, caso exista retorna as informações */
  async searchCep(cep) {
    try {
      const data = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const response = await data.json();
      //console.log(response); // Caso queira ver os dados encontrados , descomentar 
      
      /* Chamada para mostrar as informações na tela */
      this.ReponsiveJS(response);

    }
    catch (error) {
      this.printErro(); // Função a mais para printar que o Cep foi inválido;
      alert("Cep inválido"); // Alerta caso o cep esteja incorreto.
    }
  }

  // Render da parte HTML 

  // Foi utilizado uma arrow function para mostrar outro tipo de bind de função na tag form 
  render() {
    return (
      <div id='App'>
        <form className='form' action='#' onSubmit={() => this.searchCep(this.state.cep)}>
          <input className='searchCep' type='number' step='1' placeholder='00000-000' value={this.state.cep} onChange={this.setCep}></input>
          <input className='submitButton' type='submit' value='Buscar CEP'></input>
        </form>
      </div>
    );
  }
}

