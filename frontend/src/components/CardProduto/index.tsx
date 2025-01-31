import React, { useRef, useState } from "react";
import axios from "axios";

export function CardProduto({ produto, onUpdate }) {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (produto.quantidade > 0) {
            const novaQuantidade = produto.quantidade - 1;

            try {
                await fetch(`http://localhost:5000/updateProduct/${produto.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantidade: novaQuantidade }),
                });

                onUpdate(produto.id, novaQuantidade);
            } catch (error) {
                console.error("Erro ao atualizar a quantidade:", error);
            }
        }
    };

    return (
        <div className="flex justify-center items-center mb-8">
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={produto.foto || "default.png"}
                        alt={produto.nome || "Imagem do produto"}
                        className="w-full h-32 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title justify-center">{produto.nome || "Produto sem nome"}</h2>
                    <p>Quantidade: {produto.quantidade ?? "Não especificado"}</p>
                    <p>Preço: R${produto.preco ?? "0,00"}</p>
                    <div className="card-actions justify-start"></div>
                    <button className="btn btn-primary align-middle">Adicionar Material</button>
                    {/* Botão para abrir o modal */}
                    <button
                        className="btn btn-primary"
                        onClick={() => modalRef.current?.showModal()}
                        >
                        Usar Material
                    </button>                
                </div>
            </div>


            {/* Modal associado ao produto */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Usar Material</h3>
                    <p className="py-4">Tem certeza que deseja usar este material?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Fechar Modal */}
                            <button className="btn">Cancelar</button>
                        </form>
                        <button className="btn btn-success" onClick={handleConfirm}>Confirmar</button>
                            
                    </div>
                </div>
            </dialog>
        </div>
    );
}