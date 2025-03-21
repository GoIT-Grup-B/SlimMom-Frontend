import React, { useState, useEffect } from 'react';
import addVector from '../../assets/svg/add.svg';
import calendar from '../../assets/svg/calendar.svg';
import axios from 'axios';
import { DiaryDateСalendar } from '../DiaryDateСalendar/DiaryDateСalendar';

const DiaryAddProductForm = ({ date, setDate }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [weight, setWeight] = useState('');
  const [itemId, setItemId] = useState('');

  function deleteList() {
    setFilteredItems([]);
  }

  async function addProduct(itemId) {
    if (itemId && weight) {
      await axios.post(
        'https://slimmom-backend-s8n8.onrender.com/user/products',
        {
          productId: itemId,
          productWeight: weight,
          date: date,
        },
      );
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (query.length >= 2) {
        const data = await axios.get(
          `https://slimmom-backend-s8n8.onrender.com/products/searchProducts?title=${query}`,
        );
        setFilteredItems(data.data.data);
      } else {
        setFilteredItems([]);
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      <div className="flex gap-1.25 mb-8">
        <DiaryDateСalendar date={date} setDate={setDate} />
        <img src={calendar} width={20} height={20} />
      </div>
      <form className="flex flex-col items-center gap-5">
        <input
          type="search"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter product name"
          className="border-b-2 border-b-gray-200 w-full placeholder:font-bold placeholder:text-gray-400 pb-1"
        />
        <input
          type="number"
          placeholder="Grams"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border-b-2 border-b-gray-200 w-full placeholder:font-bold placeholder:text-gray-400 pb-1"
        />
        <ul className="flex flex-col">
          {filteredItems.map((item) => (
            <li
              key={item._id}
              className="cursor-pointer hover:bg-gray-200"
              onClick={() => {
                setQuery(item.title);
                setItemId(item._id);
                deleteList();
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
        <button
          className="bg-[#FC842D] rounded-full cursor-pointer w-12 h-12 drop-shadow-2xl justify-items-center mb-10"
          onClick={(e) => {
            e.preventDefault();
            addProduct(itemId);
          }}
        >
          <img src={addVector} className="w-5 h-5" />
        </button>
      </form>
    </>
  );
};

export default DiaryAddProductForm;
