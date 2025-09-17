"use client";

import { useEffect, useState } from "react";
import { Produto } from "./types/IProduto.types";
import axios from "axios";

export default function Home() {

  const [form, set_form] = useState<Produto>({ nome: ``, descricao: ``, cor: ``, quantidade: 0 });
  const [produtos, set_produtos] = useState<Produto[]>([]);

  async function cadastrar_produto(e: any) {

    e.preventDefault();

    const resposta: Produto = await axios.post(`http://localhost:8080/produtos`, form);
    set_produtos([...produtos, resposta]);
  };

  useEffect(() => {

    console.table(produtos);
    

  }, [produtos]);

  return (
    <div>
      <form onSubmit={cadastrar_produto} className="d-flex">
        <label htmlFor="">Nome</label>
        <input type="text" value={form.nome} placeholder="Insira o nome do produto" onChange={e => set_form({ ...form, nome: e.target.value })} />

        <label htmlFor="">Descrição</label>
        <input type="text" value={form.descricao} placeholder="Insira a descrição do produto" onChange={e => set_form({ ...form, descricao: e.target.value })} />

        <label htmlFor="">Cor</label>
        <input type="text" value={form.cor} placeholder="Insira a cor do produto" onChange={e => set_form({ ...form, cor: e.target.value })} />

        <label htmlFor="">Quantidade</label>
        <input type="text" value={form.quantidade} placeholder="Insira a quantidade do produto" onChange={e => set_form({ ...form, quantidade: Number(e.target.value) })} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
