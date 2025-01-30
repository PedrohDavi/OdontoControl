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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-20">
      {produtos.map((produto, index) => (
        <CardProduto key={index} produto={produto} />
      ))}
    </div>
    )
}