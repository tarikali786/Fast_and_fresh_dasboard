
export const Error = ({ text, setError }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "4rem",
        backgroundColor: "#933939",
        right: "2rem",
        padding: "",
        color: "#fff",
        width: "30%",
        paddingInline: "1rem",
        paddingBlock: ".5rem",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <p>{text}</p>
      <p
        onClick={() => setError(false)}
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "red",
          textAlign: "center",
          paddingTop: ".12rem",
          cursor: "pointer",
        }}
      >
        x
      </p>
    </div>
  );
};


