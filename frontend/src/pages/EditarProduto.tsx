import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Produto {
    nome: string;
    descricao: string;
    preco: string;
    marca: string;
    categoria: string;
    foto: string;
}

export function EditarProduto() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [produto, setProduto] = useState<Produto>({
        nome: "",
        descricao: "",
        preco: "",
        marca: "",
        categoria: "",
        foto: "",
    });
    const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [imagem, setImagem] = useState<File | null>(null);


    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/produto/${id}`);
                setProduto(response.data);
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            }
        };
        fetchProduto();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagem(e.target.files[0]);
        }
    };

    useEffect(() => {
        const fetchProduto = async () => {
            try {

                const produtoAtualizado = {
                    ...produto,
                    foto: imagem ? URL.createObjectURL(imagem) : produto.foto, // Mantém a foto antiga se não for alterada
                };
                await axios.put(`http://localhost:5000/updateProduct/${id}`, produtoAtualizado);
                setToast({ type: "success", message: "Produto atualizado com sucesso!" });
                
                if (imagem) {
                    setProduto((prev) => ({ ...prev, foto: URL.createObjectURL(imagem) }));
                }
        
                setTimeout(() => navigate("/estoque"), 1500);
            } catch (error) {
                console.error("Erro ao carregar produto:", error);
            }
        };
        fetchProduto();
    }, [id]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const produtoAtualizado = {
                ...produto,
                foto: imagem ? imagem.name : produto.foto || "", 
            };
    
            await axios.put(`http://localhost:5000/updateProduct/${id}`, produtoAtualizado);
            setToast({ type: "success", message: "Material atualizado com sucesso!" });
    
            
            if (imagem) {
                setProduto((prev) => ({ ...prev, foto: URL.createObjectURL(imagem) }));
            }
    
            setTimeout(() => navigate("/estoque"), 1500);
        } catch (error) {
            console.error("Erro ao atualizar material:", error);
            setToast({ type: "error", message: "Erro ao atualizar material!" });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-pink-100 shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Editar Produto</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Exibição da imagem atual */}
                    {produto.foto && (
                        <div className="flex justify-center">
                            <img
                                src={imagem ? URL.createObjectURL(imagem) : produto.foto}
                                alt="Produto"
                                className="w-40 h-40 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}
                    <input type="text" name="nome" value={produto.nome} onChange={handleChange} placeholder="Nome" className="input input-bordered w-full" required />
                    <textarea name="descricao" value={produto.descricao} onChange={handleChange} placeholder="Descrição" className="textarea textarea-bordered w-full" />                    <input type="text" name="preco" value={produto.preco} onChange={handleChange} placeholder="Preço" className="input input-bordered w-full" required />
                    <input type="text" name="marca" value={produto.marca} onChange={handleChange} placeholder="Marca" className="input input-bordered w-full" />
                    <input type="text" name="categoria" value={produto.categoria} onChange={handleChange} placeholder="Categoria" className="input input-bordered w-full" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                    {/* Botões */}
                    <div className="flex justify-between">
                        <button type="button" onClick={() => navigate("/estoque")} className="btn">Cancelar</button>
                        <button type="submit" className="btn btn-primary">Salvar Alterações</button>
                    </div>
                </form>

                {/* Toast de notificação */}
                {toast && (
                    <div className="toast toast-end">
                        <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"}`}>
                            <span>{toast.message}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
