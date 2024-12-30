import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionList: [],
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransactionEntry: (state, action) => {
      state.transactionList.push(action.payload);
    },
    removeTransactionEntry: (state, action) => {
      const idToRemove = action.payload;
      state.transactionList = state.transactionList.filter(
        (transaction) => transaction.id !== idToRemove
      );
    },
    removeAllTransactions: (state) => {
      state.transactionList = [];
    },
  },
});

export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
