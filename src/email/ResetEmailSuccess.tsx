import React from "react";


export default function ResetEmailSuccess( name : string) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#cbd5e1", // Light gray background
        padding: "24px", // Padding
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#1f2937", // Dark gray
          marginBottom: "10px",
        }}
      >
        Hello, {name}!
      </h1>
      <h2
        style={{
          fontSize: "1.5rem",
          color: "green",
          fontWeight: "600",
          marginTop: "8px",
        }}
      >
        Your password has been successfully reset.
      </h2>
      <p
        style={{
          color: "#4a5568", // Dark gray
          marginTop: "16px",
          fontStyle: "italic",
        }}
      >
        If you did not request this change, please contact support immediately.
      </p>
      <p
        style={{
          color: "#4a5568", // Dark gray
          marginTop: "8px",
          fontSize: "1.2rem",
        }}
      >
        Thank you!
      </p>
    </div>
  );
}
