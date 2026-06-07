import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productos } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

export default function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito, carrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!producto) {
      navigate("/productos");
      return;
    }
    document.title = `${producto.nombre} - JuegaHur`;
    return () => { document.title = "JuegaHur - Tu Tienda de Videojuegos"; };
  }, [producto, navigate]);

  if (!producto) return null;

  const enCarrito = carrito.some(i => i.id === producto.id);
  const descuento = producto.esOferta
    ? Math.round((1 - producto.precio / producto.precioOriginal) * 100)
    : 0;

  const relacionados = productos
    .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3);

  const handleAgregar = () => {
    if (producto.stock === 0) return;
    agregarAlCarrito(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  };

  const renderEstrellas = (rating) =>
    [1, 2, 3, 4, 5].map(i => (
      <i
        key={i}
        className={`bi bi-star${i <= Math.round(rating) ? "-fill" : ""}`}
        style={{ color: i <= Math.round(rating) ? "#ffd700" : "var(--text-muted)", marginRight: 2 }}
      />
    ));

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
            <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Inicio</Link>
            <span className="mx-2">›</span>
            <Link to="/productos" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Catálogo</Link>
            <span className="mx-2">›</span>
            <span style={{ color: "var(--accent-cyan)" }}>{producto.nombre}</span>
          </span>
        </nav>

        <div className="row gy-4">
          {/* Imagen */}
          <div className="col-lg-5">
            <div style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-glow)",
              position: "relative",
            }}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                onError={e => e.target.src = `https://placehold.co/600x338/16161f/00d4ff?text=${encodeURIComponent(producto.nombre)}`}
              />
              <div style={{
                position: "absolute",
                top: 12, left: 12,
                display: "flex", flexDirection: "column", gap: 6,
              }}>
                {producto.esNuevo && <span className="badge-new">Nuevo</span>}
                {producto.esOferta && <span className="badge-sale">-{descuento}%</span>}
                {producto.stock === 0 && <span className="badge-sin-stock">Sin stock</span>}
              </div>
            </div>

            {/* Generos */}
            <div className="d-flex flex-wrap gap-2 mt-3">
              {producto.genero.map(g => (
                <span key={g} style={{
                  background: "rgba(155,89,255,0.1)",
                  border: "1px solid rgba(155,89,255,0.3)",
                  color: "var(--accent-purple)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  padding: "0.2rem 0.7rem",
                  borderRadius: "3px",
                }}>
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Detalles */}
          <div className="col-lg-7">
            {/* Categoria */}
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge-cat">{producto.categoria}</span>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)" }}>
                <i className="bi bi-display me-1"></i>{producto.plataforma}
              </div>
            </div>

            {/* Titulo */}
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}>
              {producto.nombre}
            </h1>

            {/* Rating + Stock */}
            <div className="d-flex align-items-center gap-4 mb-3">
              <div className="d-flex align-items-center gap-1">
                {renderEstrellas(producto.rating)}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-secondary)", marginLeft: 4 }}>
                  {producto.rating.toFixed(1)} / 5.0
                </span>
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: producto.stock > 0 ? "var(--accent-green)" : "var(--accent-red)",
              }}>
                <i className={`bi bi-${producto.stock > 0 ? "check-circle" : "x-circle"} me-1`}></i>
                {producto.stock > 0 ? `Stock disponible (${producto.stock} unidades)` : "Sin stock"}
              </div>
            </div>

            {/* Descripcion */}
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              {producto.descripcion}
            </p>

            {/* Precio */}
            <div style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: "var(--radius-md)",
              padding: "1.25rem",
              marginBottom: "1.5rem",
            }}>
              <div className="d-flex align-items-center gap-3">
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--accent-cyan)",
                }}>
                  $ {producto.precio.toLocaleString("es-AR")}
                </span>
                {producto.esOferta && (
                  <>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1rem",
                      color: "var(--text-muted)",
                      textDecoration: "line-through",
                    }}>
                      $ {producto.precioOriginal.toLocaleString("es-AR")}
                    </span>
                    <span style={{
                      background: "rgba(255,107,53,0.15)",
                      border: "1px solid rgba(255,107,53,0.4)",
                      color: "var(--accent-orange)",
                      fontFamily: "var(--font-display)",
                      fontSize: "0.75rem",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "3px",
                    }}>
                      -{descuento}% OFF
                    </span>
                  </>
                )}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 6 }}>
                Precio en pesos argentinos · Clave digital con entrega inmediata
              </div>
            </div>

            {/* Volver al catalogo */}
            <div className="d-flex gap-3 flex-wrap">
              <button
                onClick={() => navigate("/productos")}
                className="btn-outline-cyan"
                style={{ fontSize: "0.75rem" }}
              >
                <i className="bi bi-arrow-left me-2"></i>Volver al catálogo
              </button>

              <button
                className="btn-glow"
                onClick={handleAgregar}
                disabled={producto.stock === 0}
                style={{ flex: 1, fontSize: "0.75rem", minWidth: 180 }}
              >
                {producto.stock === 0 ? (
                  <><i className="bi bi-x-circle me-2"></i>Sin stock</>
                ) : agregado ? (
                  <><i className="bi bi-check2-circle me-2"></i>¡Agregado al carrito!</>
                ) : enCarrito ? (
                  <><i className="bi bi-bag-check me-2"></i>Ya está en el carrito</>
                ) : (
                  <><i className="bi bi-bag-plus me-2"></i>Agregar al carrito</>
                )}
              </button>

              {enCarrito && (
                <Link
                  to="/carrito"
                  className="btn-outline-cyan"
                  style={{ fontSize: "0.75rem" }}
                >
                  <i className="bi bi-bag me-2"></i>Ver carrito
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relacionados.length > 0 && (
          <section style={{ marginTop: "4rem" }}>
            <div className="cyber-divider"></div>
            <h2 className="section-title mb-4">También en {producto.categoria}</h2>
            <div className="row g-3">
              {relacionados.map(p => (
                <div key={p.id} className="col-sm-6 col-md-4">
                  <div
                    className="game-card"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/producto/${p.id}`)}
                  >
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      className="game-card-img"
                      onError={e => e.target.src = `https://placehold.co/400x200/16161f/00d4ff?text=${encodeURIComponent(p.nombre)}`}
                    />
                    <div className="game-card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <span style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                        }}>{p.nombre}</span>
                        <span className="price-current" style={{ fontSize: "0.9rem" }}>$ {p.precio.toLocaleString("es-AR")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
