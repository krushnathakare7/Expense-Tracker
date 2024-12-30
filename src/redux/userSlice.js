import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  monthlyBudget: "",
  categoricalBudget: {
    food: "",
    travel: "",
    entertainment: "",
    others: "",
  },
  activeFilter: "all",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
    updateMonthlyBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    updateCategoricalBudget: (state, action) => {
      const newBudget = action.payload;
      state.categoricalBudget = {
        ...state.categoricalBudget,
        ...newBudget,
        others: (state.monthlyBudget - (newBudget.food + newBudget.travel + newBudget.entertainment ))
      };
    },
    updateActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    resetAllBudget: () => ({
      userName: "",
      monthlyBudget: "",
      categoricalBudget: {
        food: "",
        travel: "",
        entertainment: "",
      },
      activeFilter: "all",
    }),
  },
});

export const {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  updateActiveFilter,
  resetAllBudget,
} = userSlice.actions;

export default userSlice.reducer;
