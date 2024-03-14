import React, { useEffect, useState } from "react";
import "./App.css";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";

// Ensure image URLs work
bakeryData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
    // State variables
    const [bakeryItems, setBakeryItems] = useState(bakeryData);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Load data
    const loadData = () => {
        setBakeryItems(bakeryData);
    };

    useEffect(() => {
        // Load data when the component mounts
        loadData();
    }, [cartItems]); // Reload data when cart items change

    // Add item to cart
    const addToCart = (price, name) => {
        // Update total price
        setTotalPrice((prevTotal) => prevTotal + price);
        // Add item to cart
        setCartItems((prevCart) => [...prevCart, name]);
    };

    return (
        <div className="App">
            <h1>Itzy's Bakery</h1>

            <div>
                <h2>Cart</h2>
                {/* Render cart items */}
                Total Price: ${totalPrice}
                {cartItems.map((name, index) => (
                    <p key={index}>{name}</p>
                ))}
            </div>

            {/* Render bakery items using BakeryItem component */}
            {bakeryItems.map((item, index) => (
                <BakeryItem key={index} item={item} addToCart={addToCart} />
            ))}
        </div>
    );
}

export default App;
