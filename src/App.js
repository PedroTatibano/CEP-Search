import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './Services/api';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function buscar() {
    if (input === '') {
      alert('Digite seu CEP');
      return;
    }
    try {
      const res = await api.get(`${input}/json`);
      setCep(res.data);
    } catch {
      alert('Erro');
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      buscar();
    }
  }

  return (
    <div className="Container">
      <h1 className="Tittle">Buscador CEP</h1>

      <div className="ContainerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress} 
        />

        <button className="BotaoBuscar" onClick={buscar}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
