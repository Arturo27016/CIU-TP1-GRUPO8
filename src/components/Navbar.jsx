import { NavLink, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { totalItems } = useCarrito();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    background: scrolled
      ? "rgba(10, 10, 15, 0.97)"
      : "rgba(10, 10, 15, 0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: scrolled
      ? "1px solid rgba(0, 212, 255, 0.2)"
      : "1px solid transparent",
    transition: "all 0.3s ease",
    padding: "0.8rem 0",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const navLinkStyle = ({ isActive }) => ({
    fontFamily: "var(--font-display)",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
    textDecoration: "none",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    transition: "all 0.2s ease",
    position: "relative",
  });

  return (
    <nav style={navStyle}>
      <div className="container-xl">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="d-flex align-items-center gap-2">
              <div style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.3)",
              }}>
                <i className="bi bi-controller text-white" style={{ fontSize: "1.1rem" }}></i>
              </div>
              <div>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1rem",
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  lineHeight: 1,
                  letterSpacing: "0.05em",
                }}>
                  JUEGA<span style={{ color: "var(--accent-cyan)" }}>HUR</span>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.55rem",
                  color: "var(--text-muted)",
                  letterSpacing: "0.2em",
                }}>GAME STORE</div>
              </div>
            </div>
          </Link>

          {/* Navegador de escritorio */}
          <div className="d-none d-md-flex align-items-center gap-2">
            <NavLink to="/" end style={navLinkStyle}>Inicio</NavLink>
            <NavLink to="/productos" style={navLinkStyle}>Catálogo</NavLink>
            <NavLink to="/nosotros" style={navLinkStyle}>Nosotros</NavLink>
            <NavLink to="/contacto" style={navLinkStyle}>Contacto</NavLink>
          </div>

          {/* Boton del carrito */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/carrito" style={{ textDecoration: "none", position: "relative" }}>
              <div style={{
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.25)",
                borderRadius: "8px",
                padding: "0.45rem 0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.2s ease",
                cursor: "pointer",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(0, 212, 255, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.5)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(0, 212, 255, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(0, 212, 255, 0.25)";
                }}
              >
                <i className="bi bi-bag" style={{ color: "var(--accent-cyan)", fontSize: "1rem" }}></i>
                {totalItems > 0 && (
                  <span style={{
                    background: "var(--accent-cyan)",
                    color: "#000",
                    fontFamily: "var(--font-display)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    borderRadius: "10px",
                    padding: "0 6px",
                    minWidth: "18px",
                    textAlign: "center",
                  }}>{totalItems}</span>
                )}
              </div>
            </Link>

            {/* Boton menu en celular */}
            <button
              className="d-md-none btn"
              style={{ color: "var(--text-secondary)", background: "none", border: "none" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={`bi bi-${menuOpen ? "x" : "list"}`} style={{ fontSize: "1.4rem" }}></i>
            </button>
          </div>
        </div>

        {/* Menu en celular */}
        {menuOpen && (
          <div className="d-md-none pt-3 pb-2" style={{ borderTop: "1px solid var(--border-color)", marginTop: "0.8rem" }}>
            {[
              { to: "/", label: "Inicio", end: true },
              { to: "/productos", label: "Catálogo" },
              { to: "/nosotros", label: "Nosotros" },
              { to: "/contacto", label: "Contacto" },
              { to: "/carrito", label: "Carrito" },
            ].map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                style={({ isActive }) => ({
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "0.6rem 0",
                })}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
