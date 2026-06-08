import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-color)",
      padding: "3rem 0 1.5rem",
      marginTop: "4rem",
    }}>
      <div className="container-xl">
        <div className="row gy-4 mb-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))",
                borderRadius: "7px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <i className="bi bi-controller text-white" style={{ fontSize: "1rem" }}></i>
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1rem" }}>
                JUEGA<span style={{ color: "var(--accent-cyan)" }}>HUR</span>
              </span>
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              Tu tienda de videojuegos digitales. Claves originales, precios competitivos y entrega inmediata.
            </p>
          </div>
          <div className="col-md-2">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Navegación
            </p>
            {[
              { to: "/", label: "Inicio" },
              { to: "/productos", label: "Catálogo" },
              { to: "/nosotros", label: "Nosotros" },
              { to: "/contacto", label: "Contacto" },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: "block", color: "var(--text-secondary)", textDecoration: "none", marginBottom: "0.5rem", fontSize: "0.9rem", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--text-primary)"}
                onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="col-md-3">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Plataformas
            </p>
            {["Steam", "Epic Games", "GOG", "Xbox", "PlayStation"].map(p => (
              <div key={p} style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "0.4rem" }}>{p}</div>
            ))}
          </div>
          <div className="col-md-3">
            <p style={{ fontFamily: "var(--font-display)", fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--accent-cyan)", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contacto
            </p>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
              <div className="mb-2"><i className="bi bi-envelope me-2" style={{ color: "var(--accent-purple)" }}></i>soporte@juegahur.com</div>
              <div className="mb-2"><i className="bi bi-discord me-2" style={{ color: "var(--accent-purple)" }}></i>discord.gg/juegahur</div>
              <div><i className="bi bi-instagram me-2" style={{ color: "var(--accent-purple)" }}></i>@juegahurstore</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            © 2026 JuegaHur Game Store · Proyecto académico UNAHUR · Construcción de Interfaces de Usuario
          </span>
        </div>
      </div>
    </footer>
  );
}
