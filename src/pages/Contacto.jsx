import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState({});

  const validar = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Campo obligatorio.";
    if (!form.email.trim()) e.email = "Campo obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido.";
    if (!form.mensaje.trim()) e.mensaje = "Campo obligatorio.";
    return e;
  };

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validar();
    setErrores(errs);
    if (Object.keys(errs).length === 0) setEnviado(true);
  };

  const inputStyle = (campo) => ({
    background: "var(--bg-card)",
    border: `1px solid ${errores[campo] ? "var(--accent-red)" : "var(--border-color)"}`,
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    borderRadius: "var(--radius-sm)",
    padding: "0.65rem 1rem",
    width: "100%",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  });

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        <div className="row gy-5">
          {/* Panel izquierdo de info */}
          <div className="col-lg-5">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-cyan)", letterSpacing: "0.2em", marginBottom: "0.5rem", textTransform: "uppercase" }}>
              <i className="bi bi-envelope me-2"></i>Contacto
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
              Hablemos
            </h1>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
              ¿Tenés alguna consulta, problema con tu compra o simplemente querés saludarnos? 
              Nuestro equipo está disponible para ayudarte.
            </p>

            {[
              { icon: "envelope", label: "Email", val: "soporte@juegahur.com", color: "var(--accent-cyan)" },
              { icon: "discord", label: "Discord", val: "discord.gg/juegahur", color: "var(--accent-purple)" },
              { icon: "instagram", label: "Instagram", val: "@juegahurstore", color: "var(--accent-orange)" },
              { icon: "clock", label: "Horario", val: "Lun–Vie 10:00–20:00", color: "var(--accent-green)" },
            ].map(item => (
              <div key={item.label} className="d-flex align-items-center gap-3 mb-3" style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
                padding: "0.9rem 1.1rem",
              }}>
                <div style={{
                  width: 36, height: 36,
                  borderRadius: "8px",
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <i className={`bi bi-${item.icon}`} style={{ color: item.color }}></i>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--text-secondary)" }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="col-lg-7">
            {enviado ? (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(0,255,157,0.3)",
                borderRadius: "var(--radius-lg)",
                padding: "3rem",
                textAlign: "center",
              }}>
                <div style={{
                  width: 70, height: 70,
                  borderRadius: "50%",
                  background: "rgba(0,255,157,0.1)",
                  border: "2px solid var(--accent-green)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}>
                  <i className="bi bi-check2" style={{ fontSize: "2rem", color: "var(--accent-green)" }}></i>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", textTransform: "uppercase", color: "var(--accent-green)", marginBottom: "0.75rem" }}>
                  Mensaje enviado
                </h3>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                  Gracias {form.nombre}, nos pondremos en contacto a la brevedad.
                </p>
                <button
                  className="btn-outline-cyan"
                  onClick={() => { setEnviado(false); setForm({ nombre: "", email: "", asunto: "", mensaje: "" }); }}
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <div style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
              }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
                  Formulario de contacto
                </h2>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-cyber">Nombre *</label>
                      <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle("nombre")} />
                      {errores.nombre && <p style={{ color: "var(--accent-red)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginTop: 4 }}>{errores.nombre}</p>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-cyber">Email *</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" style={inputStyle("email")} />
                      {errores.email && <p style={{ color: "var(--accent-red)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginTop: 4 }}>{errores.email}</p>}
                    </div>
                    <div className="col-12">
                      <label className="form-label-cyber">Asunto</label>
                      <input type="text" name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué podemos ayudarte?" style={inputStyle("asunto")} />
                    </div>
                    <div className="col-12">
                      <label className="form-label-cyber">Mensaje *</label>
                      <textarea name="mensaje" value={form.mensaje} onChange={handleChange} rows={5} placeholder="Escribí tu consulta acá..." style={{ ...inputStyle("mensaje"), resize: "vertical" }} />
                      {errores.mensaje && <p style={{ color: "var(--accent-red)", fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginTop: 4 }}>{errores.mensaje}</p>}
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-glow" style={{ width: "100%", padding: "0.75rem" }}>
                        <i className="bi bi-send me-2"></i>Enviar mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
