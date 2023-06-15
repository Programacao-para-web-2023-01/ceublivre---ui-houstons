import React from 'react';

const fridgeItems = [
  {
    id: 1,
    name: 'Geladeira',
    image: '/caminho/para/imagem1.jpg',
    price: 1999.99,
    quantity: 5,
  },
  {
    id: 2,
    name: 'Geladeira',
    image: '/caminho/para/imagem2.jpg',
    price: 2499.99,
    quantity: 3,
  },
];

const Cart: React.FC = () => {
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
          {fridgeItems.map((item) => (
            <div className="fridge-item" key={item.id}>
              <div className="item-name">{item.name}</div>
              <div className="item-price">R${item.price}</div>
              <div className="item-quantity">{item.quantity}</div>
              {/* <img src={item.image} alt={item.name} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
