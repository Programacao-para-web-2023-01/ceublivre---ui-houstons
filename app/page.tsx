"use client"

import React, { useState } from "react";
import Header from "./components/header";
import Link from 'next/link';

export default function Home() {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event:any) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    localStorage.setItem('inputValue', inputValue);
    setInputValue('');
  };

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
      </main>
    </div>
  );
}
