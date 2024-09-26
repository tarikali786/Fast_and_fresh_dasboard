import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./header.css";
import { useState } from "react";

export const Header = ({
  title,
  buttonName,
  Buttonlink,
  itmeList,
  setItemList,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value.trim().toLowerCase());
    if (searchValue == "") {
      setItemList(itmeList);
    } else {
      const filteredList = itmeList.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
      setItemList(filteredList);
    }
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
          name="search"
          placeholder="Search by name..!"
          style={{ border: "none", outline: "none", width: "90%" }}
          onChange={handleSearch}
        />

        <FaSearch />
      </div>

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
    </div>
  );
};
