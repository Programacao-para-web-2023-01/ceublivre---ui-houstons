"use client";
import React from "react";

interface Props {
  product: string;
  chave: string;
  onAdd: () => void;
}

function AddButton({ product, chave, onAdd }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
  const key = chave;

  const addProduct = async () => {
    console.log(key)
    const url = `${apiUrl}/cart/${key}/items/product/${product}/quantity/1`;

    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => onAdd());
    }

  return (
    <button onClick={addProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded">Adicionar Produto</button>
  );
}

export default AddButton;
