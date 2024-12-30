import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ExpForm from "./ExpForm";
import Header from "./Header";
import './Transaction.css';

const Transaction = () => {

    const userSliceState = useSelector((state) => state.user)
    const location = useLocation();
    const formData = location.state || {};
    const {transactionList} = useSelector((state)=> state.transaction)
    let otherBudget = formData.budget - (formData["Entertainment Amount"] + formData["Travel Amount"] + formData["Food Amount"]);

    const calculateExpenses = (category) => {
        const totalExpense = transactionList.reduce((acc, ele) => {
            if (!category || ele.category === category) {
                acc += ele.amount;
            }
            return acc;
        }, 0);

        const budget = category
            ? formData[`${category} Amount`] ||  otherBudget || 0
            : formData.budget;

        const balance = budget - totalExpense;
        const status = balance >= 0 ? "within" : "exceed";

        return { totalExpense, budget, balance, status };
    };

    const allStats = calculateExpenses();
    const foodStats = calculateExpenses("food");
    const travelStats = calculateExpenses("travel");
    const entertainmentStats = calculateExpenses("entertainment");
    const otherStats = calculateExpenses("other");


    return (
        <>
            <Header />
            <div className="menu">
                <div>User Info {userSliceState.userName}</div>
                <div>
                <Link to="/" state={formData}>
                    <button id="new-update" >New/Update Tracker</button>
                </Link>
                    
                </div>
            </div>

            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Limit status</th>
                            <th>Budget</th>
                            <th>Expense</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>All</td>
                            <td className= {allStats.status === 'within' ? "within" : "exceed"}>{allStats.status}</td>
                            <td>{allStats.budget}</td>
                            <td>{allStats.totalExpense}</td>
                            <td>{allStats.balance}</td>
                        </tr>
                        <tr>
                            <td>Food</td>
                            <td className= {foodStats.status === 'within' ? "within" : "exceed"}>{foodStats.status}</td>
                            <td>{foodStats.budget}</td>
                            <td>{foodStats.totalExpense}</td>
                            <td>{foodStats.balance}</td>
                        </tr>
                        <tr>
                            <td>Travel</td>
                            <td className= {travelStats.status === 'within' ? "within" : "exceed"}>{travelStats.status}</td>
                            <td>{travelStats.budget}</td>
                            <td>{travelStats.totalExpense}</td>
                            <td>{travelStats.balance}</td>
                        </tr>
                        <tr>
                            <td>Entertainment</td>
                            <td className= {entertainmentStats.status === 'within' ? "within" : "exceed"}>{entertainmentStats.status}</td>
                            <td>{entertainmentStats.budget}</td>
                            <td>{entertainmentStats.totalExpense}</td>
                            <td>{entertainmentStats.balance}</td>
                        </tr>
                        <tr>
                            <td>Others</td>
                            <td className= {otherStats.status === 'within' ? "within" : "exceed"}>{otherStats.status}</td>
                            <td>{otherBudget}</td>
                            <td>{otherStats.totalExpense}</td>
                            <td>{otherStats.balance}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ExpForm />
        </>
    );
};

export default Transaction;
