import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);
  const amounts = transactions?.reduce((total, transaction) => {
    if (transaction.type === "income") {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }

  }, 0);
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        <span>{ transactions?.length > 0 ? numberWithCommas(amounts) : 0}</span>
      </h3>
    </div>
  );
};

export default Balance;
