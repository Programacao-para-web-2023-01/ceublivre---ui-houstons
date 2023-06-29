"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import process from "process";
import Link from 'next/link';
import NumberInput from './NumberInput';
import TrashButton from './TrashButton';

interface Item {
  product: number;
  quantity: number;
}

interface UserOrder {
  items: Item[];
  key: string;
  user: number;
}

interface Product {
  key: string;
  name: string;
  price: number;
}

interface ProductDetail {
  product: Product;
  quantity: number;
}

export default function Cart() {
  const [userOrder, setUserOrder] = useState<UserOrder|null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
  const [quantityMap, setQuantityMap] = useState<Record<string, number>>({});

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
    .then((data:UserOrder) => {
      setUserOrder(data);

      data.items.forEach((item) => {
        fetch(`${apiUrl}/product/${item.product}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => response.json())
        .then((productData:Product) => {
          const productDetail: ProductDetail = { product: productData, quantity: item.quantity };
          setProductDetails(prevProductDetails => [...prevProductDetails, productDetail]);
          setQuantityMap(prevQuantityMap => ({ ...prevQuantityMap, [productData.key]: item.quantity }));
        });
      });
    });
  },[]);

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantityMap(prevQuantityMap => ({ ...prevQuantityMap, [productId]: quantity }));
  };

  const removeItem = (productId: string) => {
    setProductDetails(prevProductDetails => prevProductDetails.filter(productDetail => productDetail.product.key !== productId));
    const { [productId]: _, ...remainingQuantityMap } = quantityMap;
    setQuantityMap(remainingQuantityMap);
  };

  return (
    <div className="cart-overlay">
      <div className="cart-window">
        <h2 className='cart-title'>Seus itens</h2>
        
        <div className="fridge-items-container">
          {productDetails.map((productDetail, index) => (
            <div className="fridge-item" key={index}>
              <Image className="item-img" src={'https://ibassets.com.br/ib.item.image.large/l-a8392616e76843eea018f10231341a18.jpeg'} alt="poster" width={400} height={500} />
                <div className="item-description">
                  <ul className="name-trash">
                    <li><p className="item-name">{productDetail.product.name}</p></li>
                    <li>
                      {userOrder && <TrashButton
                        id={userOrder.key}
                        product={productDetail.product.key}
                        onDeleteSuccess={() => removeItem(productDetail.product.key)}
                      />}
                    </li>
                  </ul>
                  <ul className="quantity-price">
                    <li className="item-quantity">
                      {userOrder && <NumberInput
                        id={userOrder.key}
                        product={productDetail.product.key}
                        quantity={quantityMap[productDetail.product.key] || 0}
                        onQuantityChange={updateQuantity}
                      />}
                    </li>
                    <li>
                      <p className="item-price">{`R$ ${(productDetail.product.price * (quantityMap[productDetail.product.key] || 0)).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits:2})}`}</p>
                      </li>
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
}