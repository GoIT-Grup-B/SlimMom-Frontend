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

	const handleChange = (e) => {
		setQuery(e.target.value);
	};


	return (
		<form>
			<input
				type="search"
				name="query"
				value={query}
				onChange={handleChange}
			/>
			<ul>
				{filteredItems.map((item) => (
					<li key={item.id}>{item.title}</li>
				))}
			</ul>
		</form>
	);
};

export default SearchProducts;
