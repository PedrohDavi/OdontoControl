import axios from "axios";
import React, { useRef, useState } from "react";

export function CadastroProduto() {
  const nome = useRef<HTMLInputElement>(null);
  const descricao = useRef<HTMLTextAreaElement>(null);
  const quantidade = useRef<HTMLInputElement>(null);
  const preco = useRef<HTMLInputElement>(null);
  const marca = useRef<HTMLInputElement>(null);
  const categoria = useRef<HTMLInputElement>(null);
  const foto = useRef<HTMLInputElement>(null);

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !nome.current ||
      !descricao.current ||
      !quantidade.current ||
      !preco.current ||
      !marca.current ||
      !categoria.current ||
      !foto.current ||
      !foto.current.files?.length
    ) {
      setToast({ type: "error", message: "Erro: Alguns campos estão inválidos!" });
      return;
    }

    const formData = new FormData();
    formData.append("nome", nome.current.value);
    formData.append("descricao", descricao.current.value);
    formData.append("quantidade", quantidade.current.value);
    formData.append("preco", preco.current.value);
    formData.append("marca", marca.current.value);
    formData.append("categoria", categoria.current.value);
    formData.append("foto", foto.current.files[0]); 

    try {
      await axios.post("http://localhost:5000/addProduct", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      });

      // Limpar campos do formulário
      nome.current.value = "";
      descricao.current.value = "";
      quantidade.current.value = "";
      preco.current.value = "";
      marca.current.value = "";
      categoria.current.value = "";
      foto.current.value = "";

      setToast({ type: "success", message: "Material cadastrado com sucesso!" });
      setTimeout(() => setToast(null), 3000);
    } catch (error) {
      console.error("Erro ao cadastrar Material:", error);
      setToast({ type: "error", message: "Erro ao cadastrar Material." });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && parseInt(e.target.value) < 0) {
      e.target.value = "0"; // Restringir a valores não negativos
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d*\.?\d{0,2}$/; // Permitir valores decimais com até 2 casas
    if (!regex.test(e.target.value)) {
      e.preventDefault(); // Bloquear entrada inválida
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-pink-100 p-10 rounded-lg w-full max-w-lg flex justify-center items-center flex-col gap-3"
      >
        <h1 className="font-bold text-xl mb-4">Cadastro de Material</h1>
        <input
          ref={nome}
          type="text"
          placeholder="Nome"
          className="input input-bordered input-primary w-full max-w-lg"
        />
        <textarea
          ref={descricao}
          className="textarea textarea-primary w-full max-w-lg"
          placeholder="Descrição"
        ></textarea>
        <input
          ref={quantidade}
          type="number"
          placeholder="Quantidade"
          onChange={handleQuantityChange}
          className="input input-bordered input-primary w-full max-w-lg"
        />
        <input
          ref={preco}
          type="text"
          placeholder="Preço"
          onInput={handlePriceChange}
          onChange={handleQuantityChange}
          className="input input-bordered input-primary w-full max-w-lg"
        />
        <input
          ref={marca}
          type="text"
          placeholder="Marca"
          className="input input-bordered input-primary w-full max-w-lg"
        />
        <input
          ref={categoria}
          type="text"
          placeholder="Categoria"
          className="input input-bordered input-primary w-full max-w-lg"
        />
        <input
          ref={foto}
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-lg"
        />
        <button className="btn btn-primary mt-3" type="submit">
          Cadastrar
        </button>
      </form>

      {/* Toast */}
      {toast && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
