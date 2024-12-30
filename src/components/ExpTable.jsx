import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./ExpTable.css";
import FilterControl from "./FilterControl";
import {
  removeTransactionEntry,
} from '../redux/transactionSlice'

const ExpTable = () => {
  
  const dispatch = useDispatch()
  const {transactionList} = useSelector((state)=> state.transaction)
  const {activeFilter } = useSelector((state) => state.user);

  const handleDelete = (id) => {
    dispatch(removeTransactionEntry(id + 1))
  };

  // Filter transactions based on the filterStatus
  const filteredTransactions = transactionList.filter((item) => {
    return activeFilter === "all" || item.category === activeFilter;
  });

  
  return (
    <>
      <div className="main">
        <div className="filter-section">
          <FilterControl />
        </div>
        <div className="table-section">
          <div className="App">
            <table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.amount}</td>
                      <td>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No transactions found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpTable;
