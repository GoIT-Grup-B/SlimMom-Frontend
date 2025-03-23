import React, { useState, useEffect } from 'react';
import addVector from '../../assets/svg/add.svg';
import calendar from '../../assets/svg/calendar.svg';
import axios from 'axios';
import { DiaryDateСalendar } from '../DiaryDateСalendar/DiaryDateСalendar';
import toast from 'react-hot-toast';

const DiaryAddProductForm = ({ date, setDate }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [weight, setWeight] = useState('');
  const [itemId, setItemId] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');

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
    } else {
      toast.error('You need to choose both item and the grams');
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
      <form className="flex flex-col items-center">
        <input
          type="search"
          name="query"
          value={selectedTitle}
          onChange={(e) => {
            setSelectedTitle(e.target.value);
            setQuery(e.target.value);
          }}
          placeholder="Enter product name"
          className="border-b-2 border-gray-200 w-full active:border-gray-400 placeholder:font-bold placeholder:text-gray-400 pb-1 mb-5"
        />
        {filteredItems.length > 0 ? (
          <ul className="flex flex-col border-l-2 border-r-2 border-b-2 border-gray-400">
            {filteredItems.map((item) => (
              <li
                key={item._id}
                className="cursor-pointer hover:bg-gray-200 not-last:border-b-2 border-gray-400 p-0.5"
                onClick={() => {
                  setSelectedTitle(item.title);
                  setItemId(item._id);
                  deleteList();
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        ) : (
          ''
        )}
        <input
          type="number"
          placeholder="Grams"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="border-b-2 border-b-gray-200 w-full placeholder:font-bold placeholder:text-gray-400 pb-1 mb-5"
        />

        <button
          className="bg-[#FC842D] rounded-full cursor-pointer w-12 h-12 shadow-[0_4px_10px_rgba(252,132,45,0.5)] justify-items-center mb-10"
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
