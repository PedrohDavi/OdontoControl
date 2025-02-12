import React from "react";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Hero Section */}
            <header className="flex flex-col items-center text-center py-20 px-6 bg-gray-100"
            style={{ backgroundImage: "url('http://localhost:5000/uploads/Home3.webp')" }}
>
                <h2 className="text-4xl font-bold text-gray-800">Gerencie seus materiais com facilidade</h2>
                <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                    Controle o estoque da sua clínica odontológica de forma simples, rápida e eficiente.
                </p>
                <Link to="/cadastro-material" className="mt-6 px-6 py-2 btn btn-primary text-white rounded-lg hover:bg-pink-300">
                    Cadastrar Material
                </Link>
            </header>

            {/* Destaques */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10 text-center">
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h3 className="text-xl font-semibold text-gray-800">Cadastro de Materiais</h3>
                    <p className="text-gray-600 mt-2">Adicione e gerencie materiais com poucos cliques.</p>
                </div>
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h3 className="text-xl font-semibold text-gray-800">Controle de Estoque</h3>
                    <p className="text-gray-600 mt-2">Acompanhe a quantidade disponível e evite desperdícios.</p>
                </div>
                <div className="p-6 shadow-lg rounded-lg bg-white">
                    <h3 className="text-xl font-semibold text-gray-800">Relatórios Detalhados</h3>
                    <p className="text-gray-600 mt-2">Visualize insights sobre seu estoque e melhore sua gestão.</p>
                </div>
            </section>

            {/* Espaço para imagens */}
            <section className="flex justify-center p-10">
                <div className="w-full md:w-2/3 h-64 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">Imagem do Sistema (Placeholder)</span>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-4 mt-auto">
                <p>&copy; 2025 OdontoControl. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}