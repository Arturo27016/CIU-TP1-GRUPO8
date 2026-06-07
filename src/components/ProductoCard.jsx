import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useState } from "react";

function Estrellas({ rating }) {
  return (
    <div className="d-flex align-items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <i
          key={i}
          className={`bi bi-star${i <= Math.round(rating) ? "-fill" : ""}`}
          style={{
            fontSize: "0.65rem",
            color: i <= Math.round(rating) ? "#ffd700" : "var(--text-muted)",
          }}
        />
      ))}
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginLeft: 2 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito, carrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const enCarrito = carrito.some(i => i.id === producto.id);
  const descuento = producto.esOferta
    ? Math.round((1 - producto.precio / producto.precioOriginal) * 100)
    : 0;

  const handleAgregar = () => {
    if (producto.stock === 0) return;
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="game-card d-flex flex-column">
      {/* Imagen */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="game-card-img"
          style={{ transition: "transform 0.4s ease" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.target.style.transform = "scale(1)"}
          onError={e => {
            e.target.src = `https://placehold.co/400x200/16161f/00d4ff?text=${encodeURIComponent(producto.nombre)}`;
          }}
        />
        {/* Overlay de las etiquetas */}
        <div style={{ position: "absolute", top: 8, left: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {producto.stock === 0 && <span className="badge-sin-stock">Sin stock</span>}
          {producto.esNuevo && producto.stock > 0 && <span className="badge-new">Nuevo</span>}
          {producto.esOferta && producto.stock > 0 && (
            <span className="badge-sale">-{descuento}%</span>
          )}
        </div>
      </div>

      {/* Cuerpo */}
      <div className="game-card-body d-flex flex-column flex-grow-1">
        {/* Categoria y rating */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span className="badge-cat">{producto.categoria}</span>
          <Estrellas rating={producto.rating} />
        </div>

        {/* Nombre */}
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.85rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          letterSpacing: "0.02em",
          marginBottom: "0.4rem",
          lineHeight: 1.3,
        }}>
          {producto.nombre}
        </h3>

        {/* Descripcion */}
        <p style={{
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          marginBottom: "0.8rem",
          flexGrow: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {producto.descripcionCorta}
        </p>

        {/* Plataforma */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
          <i className="bi bi-display me-1"></i>{producto.plataforma}
        </div>

        {/* Precio */}
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="price-current">$ {producto.precio.toLocaleString("es-AR")}</span>
          {producto.esOferta && (
            <span className="price-original">$ {producto.precioOriginal.toLocaleString("es-AR")}</span>
          )}
        </div>

        {/* Botones */}
        <div className="d-flex gap-2">
          <Link
            to={`/producto/${producto.id}`}
            className="btn-outline-cyan"
            style={{ flex: 1, textAlign: "center", fontSize: "0.65rem" }}
          >
            <i className="bi bi-eye me-1"></i>Detalle
          </Link>
          <button
            className="btn-glow"
            style={{ flex: 1, fontSize: "0.65rem" }}
            onClick={handleAgregar}
            disabled={producto.stock === 0}
          >
            {producto.stock === 0
              ? "Sin stock"
              : agregado || enCarrito
              ? <><i className="bi bi-check2 me-1"></i>Agregado</>
              : <><i className="bi bi-bag-plus me-1"></i>Agregar</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
