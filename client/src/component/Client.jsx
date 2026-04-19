import React from 'react'
import Avatar from 'react-avatar'

export default function Client({ username }) {
  
  return (
    <div
      className="d-flex align-items-center p-2 mb-2 rounded"
      style={{
        backgroundColor: "#1e293b",
        transition: "0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#334155")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1e293b")}
    >
      {/* Avatar */}
      <Avatar
        name={username}
        size="40"
        round={true}
        textSizeRatio={2}
      />

      {/* Username */}
      <span className="ms-3 fw-semibold text-light">
        {username}
      </span>

      {/* Online indicator */}
      <div
        className="ms-auto bg-success rounded-circle"
        style={{ width: "10px", height: "10px" }}
      ></div>
    </div>
  )
}