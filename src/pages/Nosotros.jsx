export default function Nosotros() {
  const equipo = [
    {
      nombre: "Arturo Juan Deandrea",
      rol: "Frontend Developer",
      foto: "https://github.com/Arturo27016.png",
      github: "https://github.com/Arturo27016"
    }
  ];

  const tecnologias = [
    { nombre: "React", icon: "braces", color: "var(--accent-cyan)" },
    { nombre: "React Router DOM", icon: "signpost", color: "var(--accent-purple)" },
    { nombre: "React Bootstrap", icon: "bootstrap", color: "var(--accent-orange)" },
    { nombre: "Context API", icon: "boxes", color: "var(--accent-green)" },
    { nombre: "useState / useEffect", icon: "code-slash", color: "var(--accent-cyan)" },
    { nombre: "Vite", icon: "lightning", color: "var(--accent-orange)" },
  ];

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-5">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-cyan)", letterSpacing: "0.2em", marginBottom: "0.5rem", textTransform: "uppercase" }}>
            <i className="bi bi-people me-2"></i>El proyecto
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Sobre <span style={{ color: "var(--accent-cyan)" }}>JuegaHur</span>
          </h1>
        </div>

        {/* Acerca de */}
        <div style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.05), rgba(155,89,255,0.05))",
          border: "1px solid rgba(0,212,255,0.2)",
          borderRadius: "var(--radius-lg)",
          padding: "3rem",
          marginBottom: "4rem",
          textAlign: "center",
          maxWidth: 780,
          margin: "0 auto 4rem",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎮</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
            Nuestro objetivo
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
            <strong style={{ color: "var(--accent-cyan)" }}>JuegaHur</strong> es una tienda online de videojuegos digitales desarrollada como proyecto académico
            para la materia <strong style={{ color: "var(--text-primary)" }}>Construcción de Interfaces de Usuario</strong> de la
            <strong style={{ color: "var(--accent-cyan)" }}> UNAHUR</strong>.
            Nuestro objetivo fue construir una aplicación React completa que integre
            todas las tecnologías vistas durante el cuatrimestre.
          </p>
        </div>

        {/* Equipo */}
        <h2 className="section-title no-line mb-4" style={{ textAlign: "center"}}>El equipo</h2>
        <div className="row g-3 mb-5 justify-content-center">
          {equipo.map((m, i) => (
            <div key={i} className="col-sm-6 col-md-3">
              <a href={m.github} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "2rem 1rem",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img
                    src={m.foto}
                    alt={m.nombre}
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: "50%",
                      border: "2px solid rgba(0,212,255,0.3)",
                      objectFit: "cover",
                      display: "block",
                      margin: "0 auto 1rem",
                    }}
                  />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem", color: "var(--text-primary)" }}>
                    {m.nombre}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    {m.rol}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent-cyan)" }}>
                    <i className="bi bi-github me-1"></i>GitHub
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Tecnologías usadas */}
        <h2 className="section-title no-line mb-4" style={{ textAlign: "center"}}>Tecnologías utilizadas</h2>
        <div className="row g-3">
          {tecnologias.map((t, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-2">
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                textAlign: "center",
              }}>
                <i className={`bi bi-${t.icon}`} style={{ fontSize: "1.5rem", color: t.color, marginBottom: "0.5rem", display: "block" }}></i>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  {t.nombre}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
