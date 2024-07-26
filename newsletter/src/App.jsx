import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sport, setSport] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Por favor, digite seu nome';
    if (!email) newErrors.email = 'Por favor, digite seu e-mail';
    if (!sport) newErrors.sport = 'Por favor, selecione um esporte';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage('');
    } else {
      setErrors({});

      try {
        const response = await axios.post('http://localhost:3001/', {
          user: {
            name,
            email,
            hobby: sport,
          },
        });
        console.log('User added:', response.data);
        setSuccessMessage('Cadastro realizado com sucesso!');
      } catch (error) {
        console.error('Error adding user:', error);
        setErrors({ submit: 'Erro ao tentar cadastrar. Por favor, tente novamente.' });
      }
    }
  };

  return (
    <div className='App'>
      <header>
        <div className='header-infos'>
          <p>Enviamos para todo o Brasil</p>
          <span><img src="../images/bolinha-header.svg" alt="bolinha" /></span>
          <p className='pix-header'>
            <img src="../images/icone-pix.svg" alt="icone pix" />
            Ganhe 5% de desconto no PIX 
          </p>
        </div>

        <div className='menu-icons'>
          <img src="../images/menu-hamburguer.svg" alt="menu hamburguer" className='menu-hamburguer'/>
          <nav className='navigation'>
            <ul>
              <li>Produtos˅</li>
              <li>Lançamentos</li>
              <li>Promos OU</li>
              <li>Sobre Nós</li>
            </ul>
          </nav>
          <img src="../images/Logo.svg" alt="Logo OU" className='logo-ou'/>
          <div className='icons-person-bag'>
            <div className='search-barDesk'>
              <input type="search" id='usr' placeholder='Digite sua busca'/>
            </div>
            <img src="../images/favoritos.svg" alt="" className='favoritos'/>
            <img src="../images/minha-conta.svg" alt="icone para entrar na sua conta" />
            <span className='shopping-bag'><img src="../images/shopping-bag.svg" alt="icone do carrinho de compras" />3</span>
          </div>
        </div>

        <div className='search-bar-mob'>
          <input type="search" id='usr' placeholder='Digite sua busca'/>
        </div>
      </header>

      <section className='newsletter-section'>
        <div className='newsletter-desk'>
          <div className='image-mulher'>
            <img src="../images/DSC_83901.png" alt="mulher segurando uma caixa com uma planta dentro" />
          </div>

          <div className='infos-newsletter-desk'>
            <div className='info-newsletter'>
              <h2>OU COMMUNITY</h2>
              <h3><span>Cadastre-se e ganhe 10% OFF</span> na sua primeira compra</h3>
            </div>

            <form className='signup-newsletter' onSubmit={handleSubmit}>
              <div className='input-group'>
                <input 
                  type="text" 
                  placeholder='Digite seu nome'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className='error-message'>{errors.name}</p>}
                <input 
                  type="email" 
                  placeholder='Digite seu e-mail'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className='error-message'>{errors.email}</p>}
              </div>

              <div className='radio-container'>
                <label className='title-radios'>Selecione seu esporte de interesse:</label>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="sport" 
                      value="Golfe" 
                      checked={sport === 'Golfe'}
                      onChange={(e) => setSport(e.target.value)}
                    /> Golfe
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="sport" 
                      value="Futebol"
                      checked={sport === 'Futebol'}
                      onChange={(e) => setSport(e.target.value)}
                    /> Futebol
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="sport" 
                      value="Basquete"
                      checked={sport === 'Basquete'}
                      onChange={(e) => setSport(e.target.value)}
                    /> Basquete
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="sport" 
                      value="Vôlei"
                      checked={sport === 'Vôlei'}
                      onChange={(e) => setSport(e.target.value)}
                    /> Vôlei
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="sport" 
                      value="Natação"
                      checked={sport === 'Natação'}
                      onChange={(e) => setSport(e.target.value)}
                    /> Natação
                  </label>
                </div>
                {errors.sport && <p className='error-message'>{errors.sport}</p>}
              </div>
              
              <div className='btn-submit'>
                <button type="submit">Cadastrar-me</button>
              </div>
              {errors.submit && <p className='error-message'>{errors.submit}</p>}
              {successMessage && <p className='success-message'>{successMessage}</p>}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;