import React from "react";
import './FilterControl.css'
import {
    updateActiveFilter,
  } from '../redux/userSlice'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

let statuses = [
    { id: "all", title: "All" },
    { id: "food", title: "Food" },
    { id: "travel", title: "Travel" },
    { id: "entertainment", title: "Entertainment" },
    { id: "other", title: "Other" }
]




const FilterControl = () => {

    const {activeFilter } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const changeFilterType = (id) => {
        dispatch(updateActiveFilter(id))
        //setFilterStatus(id) 
    }
    return(
        <div className="control-btn group">
            {statuses.map((status, idx) => {
                return (
                    <button
                        id={status.id}
                        className={activeFilter === status.id ? "btn active" : "btn"}
                        key={idx}
                        onClick={()=>{changeFilterType(status.id)}}
                    >
                        {status.title}
                    </button>
                )
            }
            )}
        </div>
    )
}

export default FilterControl