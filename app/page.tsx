"use client"

import { useEffect, useState } from 'react';
import Header from "./components/header";
import Image from 'next/image';
import AddButton from './components/AddButton';

interface Product {
  key: string;
  name: string;
  price: number;
}

export default function Home() {

  const [inputValue, setInputValue] = useState('');
  const [product, setProduct] = useState<any[]>([]);
  const [chave, setChave] = useState('');
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;

  const handleChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('inputValue', inputValue);
    const data = {
      user: inputValue,
      items: [],
    };

    const url = `${apiUrl}/cart/`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData:any) => {localStorage.setItem('chave', responseData.key);})

    setInputValue('');
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;

    fetch(`${apiUrl}/product`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data:any[]) => setProduct(data))
  }, []);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <section className="bg-white dark:bg-gray-900">
          <div className="rounded-lg bg-gray-700 p-6 text-neutral-700 white-lg white:bg-neutral-600 white:text-neutral-200 white:shadow-black/30">
            <input type="text" value={inputValue} onChange={handleChange} placeholder='Enter a value' />
            <button onClick={handleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Store in Local Storage</button>
          </div>
        </section>
        <div className="flex flex-wrap justify-center">
        {Array.isArray(product) && product.map((item, index) => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <Image className="item-img" src={'https://ibassets.com.br/ib.item.image.large/l-a8392616e76843eea018f10231341a18.jpeg'} alt="poster" width={400} height={500} />
            <p className="text-gray-700 text-white">R$ {item.price}</p>
            <AddButton 
              product={item.key}
            />
          </div>
        </div>
        ))}
        </div>
      </main>
    </div>
  );
}
