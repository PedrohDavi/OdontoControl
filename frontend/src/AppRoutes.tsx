import React from "react";
import { Route, Routes } from "react-router-dom";
import { ListaProdutos } from "./pages/ListaProdutos.tsx";
import { CadastroProduto } from "./components/Forms/FormCadastro/index.tsx";
import { DetalhesProduto } from "./pages/DetalhesProduto.tsx";
import { EditarProduto } from "./pages/EditarProduto.tsx";
import { Home } from "./pages/Home.tsx";

export function AppRoutes() {

    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/estoque" element={<ListaProdutos />}/>
                <Route path="/cadastro-material" element={<CadastroProduto/>}/>
                <Route path="/produto/:id" element={<DetalhesProduto/>}/>
                <Route path="/editar-material/:id" element={<EditarProduto/>}/>
            </Routes>
    )
}