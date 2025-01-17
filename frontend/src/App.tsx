import React from 'react';
import './index.css';
import { Navbar } from './components/Navbar/index.tsx';
import { CadastroProduto } from './components/Forms/FormCadastro/index.tsx';
import { CardProduto } from './components/CardProduto/index.tsx';
import { ListaProdutos } from './pages/ListaProdutos.tsx';
import { AppRoutes } from './AppRoutes.tsx';

function App() {
  return (
    <div data-theme="myCustomTheme" className="bg-secondary min-h-screen">
      <Navbar />
      <div className="pt-10 bg-secondary">
        <AppRoutes/>
      </div>
    </div>
  );
}

export default App;
