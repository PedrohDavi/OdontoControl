import React, { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function CardProduto({ produto, onUpdate }) {
    const modalAddRef = useRef<HTMLDialogElement | null>(null);
    const modalUseRef = useRef<HTMLDialogElement | null>(null);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [quantidadeAdicionar, setQuantidadeAdicionar] = useState(0);

    // Função para USAR o material (reduz a quantidade)
    const handleUseMaterial = async () => {
        if (produto.quantidade > 0) {
            const novaQuantidade = produto.quantidade - 1;

            try {
                await axios.put(`http://localhost:5000/updateProduct/${produto.id}`, {
                    quantidade: novaQuantidade,
                });

                onUpdate(produto.id, novaQuantidade);
                setToast({ type: "success", message: "Quantidade reduzida com sucesso!" });
                setTimeout(() => setToast(null), 3000);
                modalUseRef.current?.close();

            } catch (error) {
                console.error("Erro ao atualizar a quantidade:", error);
                setToast({ type: "error", message: "Erro ao atualizar a quantidade!" });
                setTimeout(() => setToast(null), 3000);
            }
        }
    };

    // Função para ADICIONAR material
    const handleAddMaterial = async () => {
        if (quantidadeAdicionar <= 0) {
            setToast({ type: "error", message: "A quantidade deve ser maior que 0!" });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        const novaQuantidade = produto.quantidade + quantidadeAdicionar;

        try {
            await axios.put(`http://localhost:5000/updateProduct/${produto.id}`, {
                quantidade: novaQuantidade,
            });

            onUpdate(produto.id, novaQuantidade);
            setToast({ type: "success", message: "Quantidade adicionada com sucesso!" });
            setTimeout(() => setToast(null), 3000);
            modalAddRef.current?.close();
            setQuantidadeAdicionar(0); // Resetar input

        } catch (error) {
            console.error("Erro ao atualizar a quantidade:", error);
            setToast({ type: "error", message: "Erro ao adicionar material!" });
            setTimeout(() => setToast(null), 3000);
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
                    <Link to={`/produto/${produto.id}`} className="justify-center text-sm font-light m-auto text-blue-400 hover:underline">
                        Ver detalhes
                    </Link>

                    {/* Botão para abrir o modal de adicionar material */}
                    <button
                        className="btn btn-primary align-middle"
                        onClick={() => modalAddRef.current?.showModal()}
                    >
                        Adicionar Material
                    </button>

                    {/* Botão para abrir o modal de usar material */}
                    <button
                        className="btn btn-primary"
                        onClick={() => modalUseRef.current?.showModal()}
                    >
                        Usar Material
                    </button>
                </div>
            </div>

            {/* Modal para ADICIONAR material */}
            <dialog ref={modalAddRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Adicionar Material</h3>
                    <p className="py-4">Qual quantidade deseja adicionar?</p>
                    <input
                        type="number"
                        placeholder="Quantidade"
                        min="1"
                        value={quantidadeAdicionar}
                        onChange={(e) => setQuantidadeAdicionar(Number(e.target.value))}
                        className="input input-bordered w-full"
                    />
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Fechar Modal */}
                            <button className="btn">Cancelar</button>
                        </form>
                        <button className="btn btn-success" onClick={handleAddMaterial}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Modal para USAR material */}
            <dialog ref={modalUseRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Usar Material</h3>
                    <p className="py-4">Tem certeza que deseja usar este material?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Fechar Modal */}
                            <button className="btn">Cancelar</button>
                        </form>
                        <button className="btn btn-success" onClick={handleUseMaterial}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Toast de Notificação */}
            {toast && (
                <div className="toast toast-end">
                    <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
