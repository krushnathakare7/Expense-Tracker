import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './ExpForm.css'
import ExpTable from "./ExpTable";
import {
    addTransactionEntry,

  } from '../redux/transactionSlice'
 
import {
    updateTotalExpense,
    updateCategoricalExpense,
    resetAllExpense,
  } from '../redux/expenseSlice'
  
import { useSelector } from "react-redux";

const ExpForm = () => {
   
    
   const [selectedListValue, setSelectedListValue] = useState("");
   const [expName, setExpName] = useState("");
   const [expAmount, setExpAmount] = useState(""); 

  const dispatch = useDispatch()
  const {transactionList} = useSelector((state)=> state.transaction)
  const totalExpense = useSelector((state)=> state.expense)
  console.log(totalExpense,'totalExpense')


//     console.log(transactionList,'transaction list')
    const handleChange = (e) => {
        e.preventDefault();
        setSelectedListValue(e.target.value);
    }

    const handleExpChange = (e) => {
        e.preventDefault();
        setExpName(e.target.value)
    }

    const handleExpAmountChange = (e) =>{
        e.preventDefault();
        setExpAmount(Number(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       let confirm = window.confirm('Do you want to add expense ?')
      
        if(confirm){
            const obj = {
                id: transactionList.length + 1,
                name:expName,
                amount:expAmount,
                category: selectedListValue
            }
            //SetTransactionList([...transactionList, obj]);
            dispatch(addTransactionEntry(obj))
            dispatch(updateTotalExpense({amount:expAmount, operation: "add"}))
            dispatch(updateCategoricalExpense({amount:expAmount, category:selectedListValue , operation:"add"}))
            setSelectedListValue("Select a Category");
            setExpName("")
            setExpAmount("")
        } else {
            setSelectedListValue("Select a Category");
            setExpName("")
            setExpAmount("")
        }
    }

 
    
    return (
        <>
           <div className="form-container">
            <div className="title" >New Expense Form</div>
                <form action="submit" className="expense-form1" onSubmit={handleSubmit}>
                        <div className="row1">
                          <div>
                            <label htmlFor="expense-name">Expense Name: </label>
                            <input type="text" name="name" id="expense-name" value={expName} onChange={handleExpChange} />
                          </div>

                            <div>
                                <label htmlFor="category-select">Select category: </label>    
                                <select name="type" id="category-select" value={selectedListValue} onChange={handleChange}>
                                <option value="">Select a Category</option>
                                    <option value="food">Food</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="travel">Travel</option>
                                    <option value="others">Other</option>
                                </select>
                            </div>

                        </div>

                        <div className="row2">
                            <label htmlFor="expense-amount">Expense Amount: </label>
                            <input type="text" id="expense-amount" name="amount" value={expAmount} onChange={handleExpAmountChange}/>
                        </div>

                        <div className="row3">
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                </form>
                <ExpTable  />
           </div>
        </>
    )
}

export default ExpForm;