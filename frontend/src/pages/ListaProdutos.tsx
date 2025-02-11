import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { CardProduto } from "../components/CardProduto/index.tsx";
import { Navbar } from "../components/Navbar/index.tsx"; 

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    preco: number;
    marca: string;
    categoria: string;
    foto?: string;
}

export function ListaProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [filtroNomeProduto, setFiltroNomeProduto] = useState(""); 

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const req = await axios.get('http://localhost:5000/getProduct');
            setProdutos(req.data);
        } catch (error) {
            console.log("Erro ao buscar Materiais");
        }
    };

    const atualizarQuantidade = (id: number, novaQuantidade: number) => {
        setProdutos((prev) =>
            prev.map((produto) => (produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto))
        );
    };


    return (
        <>
            {/* Navbar com pesquisa dinâmica */}
            <Navbar setFiltroNomeProduto={setFiltroNomeProduto} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-20 p-4">
                {produtos.length > 0 ? (
                    produtos
                        .filter((produto) =>
                            produto.nome.toLowerCase().includes(filtroNomeProduto.toLowerCase())
                        )
                        .map((produto, index) => (
                            <CardProduto key={index} produto={produto} onUpdate={atualizarQuantidade} />
                        ))
                ) : (
                    <div className="flex justify-center items-center h-[60vh] w-full col-span-full">
                        <p className="text-2xl font-semibold text-gray-500">Nenhum material encontrado</p>
                    </div>
                )}
            </div>
        </>
    );
}
