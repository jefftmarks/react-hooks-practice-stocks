import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onSellStock }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map(stock => {
        return <Stock
          key={stock.id}
          stock={stock}
          onSellStock={onSellStock}
          isBought={true}
        />
      })}
    </div>
  );
}

export default PortfolioContainer;
