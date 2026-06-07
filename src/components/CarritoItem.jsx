import { useCarrito } from "../context/CarritoContext";

export default function CarritoItem({ item }) {
  const { aumentarCantidad, disminuirCantidad, eliminarDelCarrito } = useCarrito();
  const subtotal = item.precio * item.cantidad;

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-color)",
      borderRadius: "var(--radius-md)",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border-color)"}
    >
      {/* Imagen */}
      <img
        src={item.imagen}
        alt={item.nombre}
        style={{
          width: 90,
          height: 56,
          objectFit: "cover",
          borderRadius: "6px",
          flexShrink: 0,
        }}
        onError={e => {
          e.target.src = `https://placehold.co/90x56/16161f/00d4ff?text=GAME`;
        }}
      />

      {/* Info */}
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.8rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "0.25rem",
        }}>
          {item.nombre}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)" }}>
          {item.plataforma}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "var(--text-secondary)",
          marginTop: "0.2rem",
        }}>
          $ {item.precio.toLocaleString("es-AR")} / unidad
        </div>
      </div>

      {/* Controles de cantidad */}
      <div className="d-flex align-items-center gap-2">
        <button className="qty-btn" onClick={() => disminuirCantidad(item.id)}>−</button>
        <span className="qty-display">{item.cantidad}</span>
        <button className="qty-btn" onClick={() => aumentarCantidad(item.id)}>+</button>
      </div>

      {/* Subtotal */}
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "0.9rem",
        fontWeight: 700,
        color: "var(--accent-cyan)",
        minWidth: 100,
        textAlign: "right",
      }}>
        $ {subtotal.toLocaleString("es-AR")}
      </div>

      {/* Remover */}
      <button
        className="btn-danger-custom"
        onClick={() => eliminarDelCarrito(item.id)}
        style={{ flexShrink: 0 }}
      >
        <i className="bi bi-trash"></i>
      </button>
    </div>
  );
}
