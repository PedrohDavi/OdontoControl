import React from "react";

export function CardProduto({ produto }) {

    return (
            <div className="flex justify-center items-center mb-8">
                <div className="card bg-base-100 w-64 shadow-xl">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title justify-center">{produto.nome}</h2>
                        <p>Quantidade: {produto.quantidade}</p>
                        <p>Preço: R${produto.preco}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Usar Material</button>
                        </div>
                    </div>
            </div>
        </div>
    )
}