import React from "react";

function Stock({ stock, onBuyStock, onSellStock, isBought }) {

  const {name, price} = stock;

  return (
    <div onClick={() => isBought ? onSellStock(stock) : onBuyStock(stock)}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
