import React from "react";

export function CardProduto({ produto }) {

    return (
        <div className="h-screen flex justify-start items-center">
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">{produto.nome}</h2>
                    <p>Quantidade: {produto.quantidade}</p>
                    <p>Preço: {produto.preco}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}