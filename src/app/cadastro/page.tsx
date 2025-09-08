"use client";

import React, { useState } from "react"
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";
import { IUsuario } from "../types/IUsuario.types";

export default function Cadastro() {

    const { array_usuario, set_array_usuario } = useGlobalContext();
    const [formulario, set_formulario] = useState<IUsuario>({ nome: ``, email: ``, senha: `` });

    async function cadastrar_usuario(e: any) {

        e.preventDefault();

        const verificar_email: boolean = array_usuario.find((u: any) => u.email === formulario.email);

        try {

            if (verificar_email) {

                return;

            } else {

                const resposta = await axios.post(`http://localhost:8080/usuarios`, formulario);
                set_array_usuario([...array_usuario, resposta.data]);
            };

        } catch (erro: any) {

            console.error(erro);
            throw new Error(`Erro ao cadastrar o usuário`);
        };
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Cadastro</h1>

                <form className="space-y-4" onSubmit={cadastrar_usuario}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="nome">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Seu nome"
                            value={formulario.nome}
                            onChange={e => set_formulario({ ...formulario, nome: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="seu@email.com"
                            value={formulario.email}
                            onChange={e => set_formulario({ ...formulario, email: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="senha">
                            Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            placeholder="********"
                            value={formulario.senha}
                            onChange={e => set_formulario({ ...formulario, senha: e.target.value })}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
            {array_usuario ? array_usuario.map((usuario: IUsuario, i: number) => (

                <div key={i}>

                    <p>{usuario.nome}</p>

                </div>
            )) : ``}
        </div>
    );
};