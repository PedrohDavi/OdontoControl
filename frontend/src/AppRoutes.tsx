import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListaProdutos } from "./pages/ListaProdutos.tsx";
import { CadastroProduto } from "./components/Forms/FormCadastro/index.tsx";

export function AppRoutes() {

    return (
            <Routes>
                <Route path="/" element={<ListaProdutos/>}/>
                <Route path="/estoque" element={<ListaProdutos />}/>
                <Route path="/cadastro-material" element={<CadastroProduto/>}/>
            </Routes>
    )
}