"use client";

import "./styles.css";
import React, { useState, FormEvent } from "react";

interface Product {
  title: string;
  link: string;
  price: string;
}

interface ProductListProps {
  products: Product[];
  avgPrice: number;
}

const ProductList: React.FC<ProductListProps> = ({ products, avgPrice }) => {
  return (
    <div className="product-list-container">
      <div className="product-list-heading">
        <h1 className="product-list-title">Suche: Erfolgreich</h1>
        <h1 className="product-list-title">Durchschnittspreis: €{avgPrice}</h1>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.title} className="product-item">
            <h3 className="product-title">Title: {product.title}</h3>
            <p className="product-link">
              {" "}
              Link:
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                {product.link}
              </a>
            </p>
            <p className="product-price">
              Price: <span className="price">€{product.price}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const [productType, setProductType] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [responseIsThere, setIfResponse] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const[avgPrice, setAvgPrice] = useState(0.0);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Hier können Sie die Formulardaten verarbeiten
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productType,
          productWidth,
          productDepth,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response from server:", result);
        setIfResponse(true);
        setProducts(result || []);
        const totalPrices = result.reduce(
          (sum:any, product:any) => sum + product.price,
          0
        );
        const averagePrice = totalPrices / result.length;

        setAvgPrice(averagePrice);
      } else {
        console.error("Failed to send data to the server");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    //console.log("Product Size:", productSize);
  };

  return (
    <main>
      <form className="app__form" onSubmit={handleSubmit}>
        <div>
          <label>
            Produkttyp:
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Waschbecken">Waschbecken</option>
              <option value="Heizkörper">Heizkörper</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Breite:
            <select
              value={productWidth}
              onChange={(e) => setProductWidth(e.target.value)}
            >
              <option value="">Select Width</option>
              <option value="50">50 cm</option>
              <option value="100">100 cm</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <div>
          <label>
            Tiefe:
            <select
              value={productDepth}
              onChange={(e) => setProductDepth(e.target.value)}
            >
              <option value="">Select Depth</option>
              <option value="30">30 cm</option>
              <option value="60">60 cm</option>
              {/* Add more options as needed */}
            </select>
          </label>
        </div>
        <div>
          <button type="submit">Suchen</button>
        </div>
      </form>
    {responseIsThere && <ProductList products={products} avgPrice={avgPrice} /> }
    </main>
  );
}
