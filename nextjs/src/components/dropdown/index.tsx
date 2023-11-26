"use client";
import { useState } from "react";
import "./style.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  changePage,
  changeResultPerPage,
  changeTotalPage,
} from "../../../store/dataForApi/dataForApiSlice";

const Dropdown = () => {
  const { resultPerPage } = useAppSelector((state) => state.dataForApiSlice);
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState<boolean>(false);

  function handleItemClick(el: string) {
    setIsActive(false);
    dispatch(changeResultPerPage(el));
    dispatch(changePage("1"));
    dispatch(changeTotalPage(0));
  }
  return (
    <div className="dropdown">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        data-testid="select"
      >
        {resultPerPage ?? "Chose"}
        <span className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"} />
      </div>
      <div
        data-testid="content"
        className="dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        {["8", "12", "16"].map((el) => (
          <div
            className="item"
            data-testid="value"
            key={`limit-${el}`}
            onClick={() => handleItemClick(el)}
          >
            {el}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
