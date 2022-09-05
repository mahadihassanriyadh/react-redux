import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
  editInActive,
} from "../features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, isError, error, editing } = useSelector(
    (state) => state.transaction || {}
  );

  const resetForm = () => {
    setName("");
    setType("");
    setAmount("");
  };

  // listen for editing state change / edit mode acctive
  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      setEditMode(false);
      resetForm();
    }
  }, [editing]);

  const handleCreate = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    resetForm();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(changeTransaction({
      id: editing.id,
      data: {
        name,
        type,
        amount: Number(amount),
      }
    }));
    dispatch(editInActive());
  }

  const cancelEditMode = () => {
    setEditMode(false);
    dispatch(editInActive());
    resetForm();
  };
  
  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleCreate}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            placeholder="enter title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              required
              checked={type === "income"}
              onChange={(e) => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              checked={type === "expense"}
              onChange={(e) => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="enter amount"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button disabled={isLoading} className={editMode ? "btn-update" : "btn"} type="submit">
          { editMode ? "Update" : "Add" } Transaction
        </button>

        {editMode && (
          <button className="btn cancel_edit" onClick={cancelEditMode}>
            Cancel Edit
          </button>
        )}

        {!isLoading && isError && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Form;
