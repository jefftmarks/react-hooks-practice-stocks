import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [counter, setCounter] = useState(0);
  const [sortCategory, setSortCategory] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  
  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => {
        setStocks(data);
        setCounter(data.length + 1);
      })
  }, [])

  function handleBuyStock(boughtStock) {
    const updatedStock = {...boughtStock, id: counter};
    setPortfolio([...portfolio, updatedStock]);
    setCounter(counter => counter + 1);
  }

  function handleSellStock(soldStock) {
    setPortfolio(portfolio.filter(stock => stock.id !== soldStock.id));
  }

  const updatedStocks = stocks
    .sort(compareStocks)
    .filter(filterStocks)

  function compareStocks(a, b) {
    if (sortCategory === "All") {
      return 0;
    } else if (sortCategory === "Alphabetically") {
      let x = a.ticker.toLowerCase();
      let y = b.ticker.toLowerCase();
      if (x > y) return 1;
      if (x < y) return -1;
      if (x === y) return 0;
    } else if (sortCategory === "Price") {
      return b.price - a.price;
    }
  }

  function filterStocks(stock) {
    if (filterCategory === "All") {
      return true;
    } else {
      return stock.type === filterCategory;
    }
  }

  return (
    <div>
      <SearchBar
        onSort={setSortCategory}
        sortCategory={sortCategory}
        onFilter={setFilterCategory}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={updatedStocks} onBuyStock={handleBuyStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            portfolio={portfolio}
            onSellStock={handleSellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
