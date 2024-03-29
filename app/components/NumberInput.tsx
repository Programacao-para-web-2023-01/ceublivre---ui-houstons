"use client";
import React, { useState } from 'react';
import axios from 'axios';

interface Update {
  id: string;
  product: string;
  quantity: number;
  onQuantityChange: (productId: string, quantity: number) => void;
}

function NumberInput({ id, product, quantity, onQuantityChange }: Update) {
  const [value, setValue] = useState(quantity);
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;

  const updateQuantity = async (newQuantity: number) => {
    setValue(newQuantity);
    onQuantityChange(product, newQuantity);
    
    const url = `${apiUrl}/cart/${id}/items/product/${product}/quantity/${newQuantity}`;

    try {
      const response = await axios.put(url, null, {
        headers: {
          accept: 'application/json',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const decrement = () => {
    const newValue = Math.max(1, value - 1);
    updateQuantity(newValue);
  };

  const increment = () => {
    updateQuantity(value + 1);
  };

  return (
    <div className="custom-number-input h-10 w-32">
      <label htmlFor="custom-input-number" className="w-full text-gray-700 text-sm font-semibold">Quantidade</label>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button onClick={decrement} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
          <span className="m-auto text-2xl font-thin">-</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none"
          name="custom-input-number"
          value={value}
          readOnly
        />
        <button onClick={increment} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}

export default NumberInput;