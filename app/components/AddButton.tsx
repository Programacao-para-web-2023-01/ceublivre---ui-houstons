"use client";
import React from "react";


interface Props {
  product: number;
}

function AddButton({ product }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
  const key = localStorage.getItem("chave");

  const addProduct = async () => {
    console.log(key)
    const url = `${apiUrl}/cart/${key}/items/product/${product}/quantity/1`;

    fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

  return (
    <button onClick={addProduct} className='trash-button'>Adicionar Produto</button>
  );
}

export default AddButton;
