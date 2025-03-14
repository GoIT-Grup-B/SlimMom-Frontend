import axios from "axios";
import React, { useEffect, useState } from "react";

const SearchProducts = () => {
	const [query, setQuery] = useState("");
	const [filteredItems, setFilteredItems] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const data = await axios.get(
				`http://localhost:5000/products/searchProducts?title=${query}`
			);
			setFilteredItems(data.data.data);
		}
		fetchData();
	}, [query]);

	console.log(filteredItems);

	const handleChange = (e) => {
			setQuery(e.target.value);
	};

	const filteredProducts = filteredItems.filter((item) => {
		item;
	});

	return (
		<form>
			<input
				type="search"
				name="query"
				value={query}
				onChange={handleChange}
			/>
			<ul>
				{filteredProducts.map((item) => (
					<li key={item}>{item}</li>
				))}
			</ul>
		</form>
	);
};

export default SearchProducts;
