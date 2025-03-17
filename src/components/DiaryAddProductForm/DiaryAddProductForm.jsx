import React, { useState, useEffect } from 'react';
import addVector from '../../assets/svg/Vector.svg';
import axios from 'axios';
import { DiaryDateСalendar } from '../DiaryDateСalendar/DiaryDateСalendar';

const DiaryAddProductForm = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <DiaryDateСalendar
      />
      <form>
        <input
          type="search"
          name="query"
          value={query}
          onChange={handleChange}
          placeholder="Enter product name"
        />
        <input type="number" placeholder="Grams" />
        <button className="bg-[#FC842D] rounded-full cursor-pointer w-10 h-10 drop-shadow-2xl justify-items-center">
          <img src={addVector} className="w-5 h-5" />
        </button>
      </form>
      <ul>
        {filteredItems.map((item) => (
          <li
            key={item._id}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => console.log(item._id)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DiaryAddProductForm;
