import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalExpense: 0,
  categoricalExpense: {
    food: 0,
    travel: 0,
    entertainment: 0,
    others: 0,
  },
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    updateTotalExpense: (state, action) => {
      const { amount, operation } = action.payload;
     
      if (operation === "add") {
        state.totalExpense += amount;
      } else if (operation === "subtract") {
        state.totalExpense -= amount;
      }
    },
    updateCategoricalExpense: (state, action) => {
      const { amount, category, operation } = action.payload;
      console.log(amount,'amount', operation,'operation', category, 'category')
      if (operation === "add") {
        state.categoricalExpense[category] += amount;
      } else if (operation === "subtract") {
        state.categoricalExpense[category] -= amount;
      }
    },
    resetAllExpense: () => initialState,
  },
});

export const {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
