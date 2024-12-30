import React, {  useState } from "react";
import "./Landing.css";
import Header from "./Header";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserName,
  updateMonthlyBudget,
  updateCategoricalBudget,
  resetAllBudget,
} from "../redux/userSlice";

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userSliceState = useSelector((state) => state.user)
  
  const { userName, monthlyBudget, categoricalBudget } = useSelector(
    (state) => state.user
  );
 
  // Local state for form fields
  const initialData = location.state || {};
  const [name, setName] = useState(initialData.name || userName);
  const [budget, setBudget] = useState(initialData.budget || monthlyBudget);
  const [foodAmt, setFoodAmt] = useState(
    initialData["Food Amount"] || categoricalBudget.food
  );
  const [travelAmt, setTravelAmt] = useState(
    initialData["Travel Amount"] || categoricalBudget.travel
  );
  const [entertainmentAmt, setEntertainmentAmt] = useState(
    initialData["Entertainment Amount"] || categoricalBudget.entertainment
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserName(name));
    dispatch(updateMonthlyBudget(budget));
    dispatch(
      updateCategoricalBudget({
        food: foodAmt,
        travel: travelAmt,
        entertainment: entertainmentAmt,
      })
    );

    const formData = {
      name,
      budget,
      "Food Amount": foodAmt,
      "Travel Amount": travelAmt,
      "Entertainment Amount": entertainmentAmt,
    };

    navigate("/tracker", { state: formData });
  };


  const clearData = () => {
    const confirmClear = window.confirm("Do you want to clear all data?");
    if (confirmClear) {
      // Reset Redux state
      dispatch(resetAllBudget());
      setName("");
      setBudget("");
      setFoodAmt("");
      setTravelAmt("");
      setEntertainmentAmt("");
      navigate("/");
    }
  };

  let isObj = Object.keys(initialData).length;


  return (
    <>
      <Header />
      <div className="container">
        <div className="container-content">
          <h1>Welcome to your own expense tracker</h1>
          <h2>Please fill in below details to start tracking</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleFormSubmit} name="landing-page-form">
            <label htmlFor="name">Enter your Name: </label>
            <input
              type="text"
              name="name"
              value={name}
              id = "name"
              onChange={(e) => setName(e.target.value)}
            />
            <br /> <br />
            <label htmlFor="budget">Type Monthly Budget: </label>
            <input
              type="number"
              name="budget"
              value={budget}
              id = "budget"
              onChange={(e) => setBudget(Number(e.target.value))}
            />
            <br />
            <h3>Enter your categorical Budget</h3>
            <div className="cat-container">
              <div className="items">
                <label htmlFor="food">Food: </label>
                <br />
                <input
                  type="number"
                  name="food"
                  id ="food"
                  value={foodAmt}
                  onChange={(e) => setFoodAmt(Number(e.target.value))}
                />
                <br />
              </div>
              <div className="items">
                <label htmlFor="entertainment">Entertainment: </label>
                <br />
                <input
                  type="number"
                  name="entertainment"
                  id="entertainment"
                  value={entertainmentAmt}
                  onChange={(e) => setEntertainmentAmt(Number(e.target.value))}
                />
                <br />
              </div>
              <div className="items">
                <label htmlFor="travel">Travel: </label>
                <br />
                <input
                  type="number"
                  name="travel"
                  id="travel"
                  value={travelAmt}
                  onChange={(e) => setTravelAmt(Number(e.target.value))}
                />
                <br />
              </div>
            </div>

            {isObj ? <div className="btn">
              <button type="submit">update budget</button>
              <button id="clear" type="button" onClick={clearData}>
                Start New Tracker
              </button>
              <Link to="/tracker" state={initialData}>
                <button type="button">Go Back</button>
              </Link>
            </div> : <div className="btn">
            <Link to="/tracker" state={initialData}>
                <button type="button" onClick={handleFormSubmit}>Submit</button>
              </Link>
            </div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Landing;
