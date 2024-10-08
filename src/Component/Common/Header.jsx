import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import "./header.css";
import { useState } from "react";

export const Header = ({
  title = "",
  buttonName,
  Buttonlink,
  handleSearch,
  placeholder = "Search by name..!",
  button,
  dateFilter,
}) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleIconClick = () => {
    setIsInputVisible(true); // Show the input on icon click
    document.getElementById("filterdate").focus(); // Focus on input to show date picker
  };

  return (
    <div className="md:pt-0 pt-10 flex justify-between flex-wrap items-center">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-slate-700">
          {title}
        </p>
      </div>

      <div className="SearchBar">
        <input
          type="text"
          name="text"
          placeholder={placeholder}
          style={{ border: "none", outline: "none", width: "90%" }}
          onChange={handleSearch}
        />
        {dateFilter && (
          <>
            <label htmlFor="filterdate" onClick={handleIconClick}>
              <CiCalendarDate />
            </label>
            <input
              type="date"
              id="filterdate"
              name="date"
              className={isInputVisible ? "active" : ""}
              onChange={handleSearch}
            />
          </>
        )}

        {!dateFilter && <FaSearch />}
      </div>

      {!button && (
        <div className="mr-4">
          <Link
            to={Buttonlink}
            style={{
              backgroundColor: "rgb(3, 201, 215)",
              color: "#fff",
              padding: "0.8rem 1.4rem",
              borderRadius: "10px",
            }}
          >
            {buttonName}
          </Link>
        </div>
      )}
    </div>
  );
};
