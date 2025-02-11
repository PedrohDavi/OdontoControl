import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar({ setFiltroNomeProduto }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setFiltroNomeProduto(value); // Atualiza o filtro no componente pai
  };

  return (
    <div className="navbar bg-primary fixed top-0 left-0 w-full z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/estoque">Materiais</Link></li>
            <li><Link to="/cadastro-material">Cadastrar</Link></li>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">OdontoControl</a>
      </div>

      <div className="navbar-end">
        {/* Input de pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar material..."
          value={inputValue}
          onChange={handleInputChange}
          className="input input-bordered input-sm w-32 md:w-48"
        />
      </div>
    </div>
  );
}
