import { useState } from "react";

export default function FormularioCompra({ onSubmit, carritoVacio }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    direccion: "",
    entrega: "digital",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});

  const validar = (datos) => {
    const e = {};
    if (!datos.nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!datos.apellido.trim()) e.apellido = "El apellido es obligatorio.";
    if (!datos.email.trim()) {
      e.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
      e.email = "Ingresá un email válido.";
    }
    if (!datos.telefono.trim()) e.telefono = "El teléfono es obligatorio.";
    if (!datos.direccion.trim()) e.direccion = "La dirección/localidad es obligatoria.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevo = { ...form, [name]: value };
    setForm(nuevo);
    if (tocado[name]) {
      setErrores(validar(nuevo));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTocado(prev => ({ ...prev, [name]: true }));
    setErrores(validar(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todosT = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTocado(todosT);
    const errs = validar(form);
    setErrores(errs);
    if (Object.keys(errs).length === 0 && !carritoVacio) {
      onSubmit(form);
    }
  };

  const inputStyle = (campo) => ({
    background: "var(--bg-card)",
    border: `1px solid ${errores[campo] && tocado[campo] ? "var(--accent-red)" : "var(--border-color)"}`,
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    borderRadius: "var(--radius-sm)",
    padding: "0.6rem 1rem",
    transition: "all 0.2s",
    width: "100%",
    fontSize: "0.9rem",
  });

  const errorStyle = {
    color: "var(--accent-red)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.7rem",
    marginTop: "0.25rem",
  };

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-lg)",
      padding: "2rem",
    }}>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.1rem",
        color: "var(--text-primary)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        marginBottom: "0.5rem",
      }}>
        Datos de entrega
      </h2>
      <div className="cyber-divider"></div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          {/* Nombre */}
          <div className="col-md-6">
            <label className="form-label-cyber">Nombre *</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu nombre"
              style={inputStyle("nombre")}
            />
            {errores.nombre && tocado.nombre && <p style={errorStyle}>{errores.nombre}</p>}
          </div>

          {/* Apellido */}
          <div className="col-md-6">
            <label className="form-label-cyber">Apellido *</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tu apellido"
              style={inputStyle("apellido")}
            />
            {errores.apellido && tocado.apellido && <p style={errorStyle}>{errores.apellido}</p>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label-cyber">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="correo@ejemplo.com"
              style={inputStyle("email")}
            />
            {errores.email && tocado.email && <p style={errorStyle}>{errores.email}</p>}
          </div>

          {/* Teléfono */}
          <div className="col-md-6">
            <label className="form-label-cyber">Teléfono *</label>
            <input
              type="tel"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+54 11 xxxxxxxx"
              style={inputStyle("telefono")}
            />
            {errores.telefono && tocado.telefono && <p style={errorStyle}>{errores.telefono}</p>}
          </div>

          {/* Dirección */}
          <div className="col-12">
            <label className="form-label-cyber">Dirección / Localidad *</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ciudad, Provincia"
              style={inputStyle("direccion")}
            />
            {errores.direccion && tocado.direccion && <p style={errorStyle}>{errores.direccion}</p>}
          </div>

          {/* Método de entrega */}
          <div className="col-12">
            <label className="form-label-cyber">Método de entrega *</label>
            <select
              name="entrega"
              value={form.entrega}
              onChange={handleChange}
              style={{
                ...inputStyle("entrega"),
                cursor: "pointer",
              }}
            >
              <option value="digital">Entrega digital (clave por email)</option>
              <option value="cuenta">Cuenta de Steam compartida</option>
              <option value="fisico">Producto físico (solo disponibles)</option>
            </select>
          </div>

          {/* Mensaje */}
          <div className="col-12">
            <label className="form-label-cyber">Mensaje o aclaración (opcional)</label>
            <textarea
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              rows={3}
              placeholder="¿Alguna consulta o aclaración especial?"
              style={{ ...inputStyle("mensaje"), resize: "vertical" }}
            />
          </div>

          {/* Submit */}
          <div className="col-12">
            {carritoVacio && (
              <p style={{ ...errorStyle, marginBottom: "0.75rem", fontSize: "0.8rem" }}>
                <i className="bi bi-exclamation-triangle me-1"></i>
                Tu carrito está vacío. Agregá productos antes de confirmar.
              </p>
            )}
            <button
              type="submit"
              className="btn-glow"
              disabled={carritoVacio}
              style={{ width: "100%", padding: "0.8rem", fontSize: "0.8rem" }}
            >
              <i className="bi bi-shield-check me-2"></i>
              Confirmar compra
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
