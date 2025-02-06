import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    quantidade: number;
    preco: string;
    marca: string;
    categoria: string;
    foto: string;
}

export function DetalhesProduto() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [produto, setProduto] = useState<Produto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);



    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/produto/${id}`);
                setProduto(response.data);
            } catch (err) {
                setError("Erro ao carregar produto.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduto();
    }, [id]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!produto) return <p>Produto não encontrado.</p>;

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/deleteProduct/${id}`);
            setToast({ type: "success", message: "Material excluído com sucesso!" });
            setTimeout(() => {
                navigate("/estoque");
            }, 1500);
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            setToast({ type: "error", message: "Erro ao excluir Material." });
        }
    };

    const handleEdit = () => {
        navigate(`/editar-material/${id}`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-pink-100 shadow-lg rounded-lg p-8 max-w-3xl w-full">
                <h1 className="text-4xl font-bold text-center mb-6">{produto.nome}</h1>
                <div className="flex flex-col md:flex-row items-center">
                    {/* Imagem */}
                    <img
                        src={produto.foto || "default.png"}
                        alt={produto.nome}
                        className="w-80 h-80 object-cover rounded-lg shadow-md"
                    />
                    {/* Detalhes do Produto */}
                    <div className="md:ml-8 mt-6 md:mt-0 w-full">
                        <p className="text-lg mb-3"><strong>Descrição:</strong> {produto.descricao}</p>
                        <p className="text-lg mb-3"><strong>Quantidade:</strong> {produto.quantidade}</p>
                        <p className="text-lg mb-3"><strong>Preço:</strong> R$ {produto.preco}</p>
                        <p className="text-lg mb-3"><strong>Marca:</strong> {produto.marca}</p>
                        <p className="text-lg"><strong>Categoria:</strong> {produto.categoria}</p>
                        <button onClick={handleEdit} className="btn btn-warning px-6 py-2 mt-8 mr-8">Editar</button>
                        <button onClick={() => modalRef.current?.showModal()} className="btn btn-error px-6 py-2">
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal de Confirmação */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirmar Exclusão</h3>
                    <p className="py-4">Tem certeza de que deseja excluir este material? Esta ação não pode ser desfeita.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* Botão para fechar o modal sem excluir */}
                            <button className="btn">Cancelar</button>
                        </form>
                        <button className="btn btn-error" onClick={handleDelete}>Confirmar</button>
                    </div>
                </div>
            </dialog>
            {/* Toast */}
            {toast && (
                <div className="toast toast-end">
                    <div
                        className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"
                            }`}
                    >
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}


