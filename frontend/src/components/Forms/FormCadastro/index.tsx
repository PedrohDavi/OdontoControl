import axios from "axios";
import React, { useRef } from "react";


export function CadastroProduto() {

    const nome = useRef<HTMLInputElement>(null);
    const descricao = useRef<HTMLTextAreaElement>(null);
    const quantidade = useRef<HTMLInputElement>(null);
    const preco = useRef<HTMLInputElement>(null);
    const marca = useRef<HTMLInputElement>(null);
    const categoria = useRef<HTMLInputElement>(null);
    const foto = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !nome.current ||
            !descricao.current ||
            !quantidade.current ||
            !preco.current ||
            !marca.current ||
            !categoria.current ||
            !foto.current
        ) {
            console.log("Erro: Alguns campos estão inválidos!");
            return;
        }

        const dadosProdutos = {
            nome: nome.current?.value,
            descricao: descricao.current?.value,
            quantidade: quantidade.current?.value,
            preco: preco.current?.value,
            marca: marca.current?.value,
            categoria: categoria.current?.value,
            foto: foto.current?.value,

        };

        try {
            const req = await axios.post("http://localhost:5000/addProduct", dadosProdutos)

            nome.current.value = "";
            descricao.current.value = "";
            quantidade.current.value = "";
            preco.current.value = "";
            marca.current.value = "";
            categoria.current.value = "";
            foto.current.value = "";
        } catch (error) {
            console.log("Erro ao cadastrar Material: ", error);
            
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit}
                className=" bg-slate-300 p-10 rounded-lg w-full max-w-lg flex justify-center items-center flex-col gap-3">
                <h1 className="font-bold text-xl mb-4">Cadastro de Material</h1>
                <input
                    ref={nome}
                    type="text"
                    placeholder="Nome"
                    className="input input-bordered input-primary w-full max-w-lg" />
                <textarea 
                ref={descricao}
                className="textarea textarea-primary w-full max-w-lg" 
                placeholder="Descrição"></textarea>
                <input
                    ref={quantidade}
                    type="number"
                    placeholder="Quantidade"
                    className="input input-bordered input-primary w-full max-w-lg" />
                <input
                    ref={preco}
                    type="number"
                    placeholder="Preço"
                    className="input input-bordered input-primary w-full max-w-lg" />
                <input
                    ref={marca}
                    type="text"
                    placeholder="Marca"
                    className="input input-bordered input-primary w-full max-w-lg" />
                <input
                    ref={categoria}
                    type="text"
                    placeholder="Categoria"
                    className="input input-bordered input-primary w-full max-w-lg" />
                <input
                    ref={foto}
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full max-w-lg" />
                <button className="btn btn-primary mt-3" type="submit">Cadastrar</button>
            </form>

        </div>
    )
}