import "./App.css";
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
        <h1 className="product-list-title">✅ Suche erfolgreich abgeschlossen</h1>
        <h2 className="product-list-title">💰 Durchschnittspreis: €{avgPrice}</h2>
        <p className="product-count">{products.length} Produkte gefunden</p>
      </div>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={`${product.title}-${index}`} className="product-item">
            <div className="product-header">
              <h3 className="product-title">{product.title}</h3>
              <div className="product-price">
                €{product.price}
              </div>
            </div>
            <div className="product-actions">
              <a 
                href={product.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="product-link"
              >
                Produkt ansehen
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function App() {
  const [productType, setProductType] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [responseIsThere, setIfResponse] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [avgPrice, setAvgPrice] = useState(0.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!productType || !productWidth || !productDepth) {
      setError("Bitte füllen Sie alle Felder aus.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIfResponse(false);

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
        
        if (result && result.length > 0) {
          const totalPrices = result.reduce(
            (sum: any, product: any) => sum + parseFloat(product.price),
            0
          );
          const averagePrice = totalPrices / result.length;
          setAvgPrice(Math.round(averagePrice * 100) / 100);
        } else {
          setAvgPrice(0);
        }
      } else {
        setError("Fehler beim Laden der Produkte. Bitte versuchen Sie es erneut.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Verbindungsfehler. Bitte überprüfen Sie Ihre Internetverbindung.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="app__header">
        <h1>🔍 Preis-Scraper</h1>
        <p>Finden Sie die besten Preise für Ihre Produkte</p>
      </div>
      
      <form className="app__form" onSubmit={handleSubmit}>
        <div>
          <label>
            Produkttyp:
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Wählen Sie einen Typ</option>
              <option value="Waschbecken">Waschbecken</option>
              <option value="Heizkörper">Heizkörper</option>
              <option value="Spüle">Spüle</option>
              <option value="Badewanne">Badewanne</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Breite:
            <select
              value={productWidth}
              onChange={(e) => setProductWidth(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Wählen Sie die Breite</option>
              <option value="50">50 cm</option>
              <option value="60">60 cm</option>
              <option value="80">80 cm</option>
              <option value="100">100 cm</option>
              <option value="120">120 cm</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Tiefe:
            <select
              value={productDepth}
              onChange={(e) => setProductDepth(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Wählen Sie die Tiefe</option>
              <option value="30">30 cm</option>
              <option value="40">40 cm</option>
              <option value="50">50 cm</option>
              <option value="60">60 cm</option>
            </select>
          </label>
        </div>
        
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}
        
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Suche läuft..." : "🔍 Suchen"}
          </button>
        </div>
      </form>
      
      {responseIsThere && <ProductList products={products} avgPrice={avgPrice} />}
    </main>
  );
}
