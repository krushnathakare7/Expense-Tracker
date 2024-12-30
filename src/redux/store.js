import { configureStore } from '@reduxjs/toolkit'
import expenseReducer from './expenseSlice'
import transactionReducer from './transactionSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    expense: expenseReducer,
    transaction: transactionReducer,
    user: userReducer
  },
})

export default store;