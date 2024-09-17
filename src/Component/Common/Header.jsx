import { Link } from "react-router-dom";

export const Header = ({ category, title, buttonName, Buttonlink }) => {
  return (
    <div className="md:pt-0 pt-10 flex justify-between flex-wrap items-center ">
      <div>
        <p className="text-2xl font-extrabold tracking-tight text-slate-700">
          {title}
        </p>
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
