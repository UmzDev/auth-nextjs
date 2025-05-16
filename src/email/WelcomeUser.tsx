import React from "react";

const WelcomeUser = (userName: string) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f4f8",
        borderRadius: "8px",
        margin: "20px auto",
        maxWidth: "600px",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "#007ee6",
        }}
      >
        Welcome, {userName}!
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "#555",
        }}
      >
        We&rsquo;re excited to have you here! Please take a moment to explore
        our features.
      </p>
    </div>
  );
};

export default WelcomeUser;
