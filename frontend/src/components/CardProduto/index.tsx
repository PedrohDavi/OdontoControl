import React from "react";

export function CardProduto({ produto }) {
    return (
        <div className="flex justify-center items-center mb-8">
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={produto.foto || "https://via.placeholder.com/150"}
                        alt={produto.nome || "Imagem do produto"}
                        className="w-full h-32 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">{produto.nome || "Produto sem nome"}</h2>
                    <p>Quantidade: {produto.quantidade ?? "Não especificado"}</p>
                    <p>Preço: R${produto.preco ?? "0,00"}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Usar Material</button>
                    </div>
                </div>
            </div>
        </div>
    );
}