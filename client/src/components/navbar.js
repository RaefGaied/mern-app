import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-3 fixed-top">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"
            alt="Logo"
            style={{ width: "120px", height: "auto", filter: "brightness(0) invert(1)" }}
          />
        </NavLink>

        {/* Burger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {[
              { to: "/", label: "Home" },
              { to: "/create", label: "Create Record" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className="nav-link"
                  to={to}
                  style={({ isActive }) => ({
                    color: isActive ? "#0d6efd" : "#fff",
                    fontWeight: isActive ? "600" : "normal",
                    transition: "color 0.2s ease-in-out",
                  })}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
