import React, { useState, useEffect } from 'react';
import addVector from '../../assets/svg/Vector.svg';
import axios from 'axios';
import { DiaryDateСalendar } from '../DiaryDateСalendar/DiaryDateСalendar';

const DiaryAddProductForm = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date());
  const [itemId, setItemId] = useState('');

  axios.interceptors.request.use((request) => {
    console.log('Request:', request);
    return request;
  });

  async function addProduct(itemId) {
    console.log('date:', date);
    if (itemId && weight) {
      console.log('item:', itemId);
      console.log('weight', weight);
      await axios.post(
        'https://slimmom-backend-s8n8.onrender.com/user/products',
          {
              productId: itemId,
              productWeight: weight,
              date: date,
          }
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
      }
    }
    fetchData();
  }, [query]);

  return (
    <>
      <DiaryDateСalendar date={date} setDate={setDate} />
      <form>
        <input
          type="search"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter product name"
        />
        <input
          type="number"
          placeholder="Grams"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button
          className="bg-[#FC842D] rounded-full cursor-pointer w-10 h-10 drop-shadow-2xl justify-items-center"
          onClick={(e) => {
            e.preventDefault();
            addProduct(itemId);
          }}
        >
          <img src={addVector} className="w-5 h-5" />
        </button>
      </form>
      <ul>
        {filteredItems.map((item) => (
          <li
            key={item._id}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => {
              setQuery(item.title);
              setItemId(item._id);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiaryAddProductForm;
