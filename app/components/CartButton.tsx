import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fab, fas)


import React, { useState } from 'react';
import Cart from './Cart';

const CartButton: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
      <button className='cartButton' onClick={toggleCart}> <FontAwesomeIcon icon={["fas", "cart-shopping"]} /></button>
      {isCartOpen && <Cart />}
    </div>
  );
};

export default CartButton;


