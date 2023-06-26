"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import process from "process";


interface Item {
  product: number;
  quantity: number;
}

interface UserOrder {
  items: Item[];
  key: string;
  user: number;
}

export default function Cart() {
  const [userOrder, setUserOrder] = useState<UserOrder[]>([]);

  useEffect(() => {
    const apiUrl = process.env.url
    console.log(apiUrl)

    fetch(`${apiUrl}/cart/user/2`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data:UserOrder[]) => setUserOrder(data))
  }, []);

  return (
    <div className="cart-overlay">
      <div className="cart-window">
        <h2 className='cart-title'>Seus itens</h2>
        <div className="topics-container">
          <div className="topic">Nome</div>
          <div className="topic">Preço</div>
          <div className="topic">Quantidade</div>
        </div>

        <div className="fridge-items-container">
          {userOrder.map((item) => (
            <div className="fridge-item" key={item.key}>
              <div className="item-name">{item.key}</div>
              <div className="item-price">R${item.user}</div>
              {/* <div className="item-quantity">{item.items}</div>
              <Image src={image} alt="poster" width={400} height={500} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
