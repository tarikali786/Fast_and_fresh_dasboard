import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./header.css";

export const Header = ({
  title = "",
  buttonName,
  Buttonlink,
  handleSearch,
  placeholder = "Search by name..!",
}) => {
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
          placeholder={placeholder}
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
