"use strict";
import React from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(fab, fas);

interface Delete {
  id: string;
  product: string;
  onDeleteSuccess?: () => void;
}

function TrashButton({ id, product, onDeleteSuccess }: Delete) {
  const apiUrl = process.env.NEXT_PUBLIC_REACT_APP_URL;

  const deleteProduct = async () => {
    const url = `${apiUrl}/cart/${id}/item/product/${product}`;

    try {
      const response = await axios.delete(url);
      if (response.status === 200) {
        console.log(`Deleted post with ID ${product}`);
        onDeleteSuccess && onDeleteSuccess();
      } else {
        console.error(`Error deleting the post with ID ${product}`);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <button onClick={deleteProduct} className='trash-button'> <FontAwesomeIcon icon={["fas", "trash"]} /></button>
  );
}

export default TrashButton;