"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import process from "process";
import Link from 'next/link';
import NumberInput from './NumberInput';
import TrashButton from './TrashButton'

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas)

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

  const [userOrder, setUserOrder] = useState<UserOrder|null>(null);
  
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;
    const user = localStorage.getItem('inputValue');

    fetch(`${apiUrl}/cart/user/${user}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data:UserOrder) => setUserOrder(data))
  }, []);

  return (
    <div className="cart-overlay">
      <div className="cart-window">
        <h2 className='cart-title'>Seus itens</h2>
        
        <div className="fridge-items-container">
          {userOrder && userOrder.items.map((item, index) => (
            <div className="fridge-item" key={index}>
              <Image className="item-img" src={'https://ibassets.com.br/ib.item.image.large/l-a8392616e76843eea018f10231341a18.jpeg'} alt="poster" width={400} height={500} />
                <div className="item-description">
                  <ul className="name-trash">
                    <li><p className="item-name">Blusa Botafogo Goleiro 2022</p></li>
                    <li>
                      <TrashButton
                        id={userOrder?.key}
                        product={item.product}
                      />
                    </li>
                  </ul>
                  <ul className="quantity-price">
                    <li>
                      <NumberInput
                        id={userOrder?.key}
                        product={item.product}
                        quantity={item.quantity}
                      />
                    </li>
                    <li><p className="item-price">R${item.quantity * 30}</p></li>
                  </ul>
                </div>
            </div>
          ))}
        </div>
          <Link href={`/api`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-20 rounded">
            Finalizar Pedido
          </Link>
        </div>
      </div>
  );
};
