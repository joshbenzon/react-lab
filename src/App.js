import React, { useEffect, useState } from "react";
import "./App.css";
import bakeryData from "./assets/bakery-data.json";

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

    // Render bakery items
    const renderBakeryItems = () => {
        return bakeryItems.map((item, index) => (
            <div key={index}>
                {/* Click event to add item to cart */}
                <p onClick={() => addToCart(item.price, item.name)}>
                    {item.name}, {item.description}, {item.price}
                </p>
                {/* Display item image */}
                <img src={item.image} alt="image" />
            </div>
        ));
    };

    // Render cart items
    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return <p>Cart is empty</p>;
        }
        return cartItems.map((name, index) => <p key={index}>{name}</p>);
    };

    return (
        <div className="App">
            <h1>Itzy's Bakery</h1>

            {/* Render bakery items */}
            {renderBakeryItems()}

            <div>
                <h2>Cart</h2>
                {/* Render cart items */}
                Total Price: {totalPrice}
                {renderCartItems()}
            </div>
        </div>
    );
}

export default App;
