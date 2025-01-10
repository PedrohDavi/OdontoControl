import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { CardProduto } from "../components/CardProduto/index.tsx";


export function ListaProdutos(){
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () =>{
        try {
            const req = await axios.get('http://localhost:5000/getProduct')
        
            const produtos = req.data;
            setProdutos(produtos);
        } catch (error) {
            console.log("Erro ao buscar Materiais");
            
        }
    }

    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {produtos.map((produto, index) => (
        <CardProduto key={index} produto={produto} />
      ))}
    </div>
    )
}