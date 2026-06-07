import { Link } from "react-router-dom";
import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import CarritoItem from "../components/CarritoItem";
import FormularioCompra from "../components/FormularioCompra";

export default function Carrito() {
  const { carrito, totalItems, totalPrecio, vaciarCarrito } = useCarrito();
  const [modalVisible, setModalVisible] = useState(false);
  const [datosCompra, setDatosCompra] = useState(null);

  const handleConfirmarCompra = (datos) => {
    setDatosCompra(datos);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    vaciarCarrito();
    setDatosCompra(null);
  };

  if (carrito.length === 0 && !modalVisible) {
    return (
      <div className="page-wrapper">
        <div className="container-xl" style={{ textAlign: "center", paddingTop: "4rem", paddingBottom: "4rem" }}>
          <div style={{
            width: 100, height: 100,
            borderRadius: "50%",
            background: "rgba(0,212,255,0.05)",
            border: "2px solid rgba(0,212,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 2rem",
          }}>
            <i className="bi bi-bag" style={{ fontSize: "2.5rem", color: "var(--accent-cyan)", opacity: 0.5 }}></i>
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "1rem",
          }}>
            Tu carrito está vacío
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
            Explorá el catálogo y encontrá tus próximos juegos.
          </p>
          <Link to="/productos" className="btn-glow" style={{ fontSize: "0.8rem" }}>
            <i className="bi bi-grid me-2"></i>Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-cyan)", letterSpacing: "0.2em", marginBottom: "0.4rem" }}>
              <i className="bi bi-bag me-2"></i>Carrito
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tu <span style={{ color: "var(--accent-cyan)" }}>carrito</span>
            </h1>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {totalItems} {totalItems === 1 ? "producto" : "productos"}
          </div>
        </div>

        <div className="row gy-4">
          {/* Items */}
          <div className="col-lg-7">
            <div className="d-flex flex-column gap-3">
              {carrito.map(item => (
                <CarritoItem key={item.id} item={item} />
              ))}
            </div>

            <div className="d-flex gap-3 mt-3">
              <button
                className="btn-danger-custom"
                onClick={vaciarCarrito}
              >
                <i className="bi bi-trash me-2"></i>Vaciar carrito
              </button>
              <Link to="/productos" className="btn-outline-cyan" style={{ fontSize: "0.65rem" }}>
                <i className="bi bi-arrow-left me-1"></i>Seguir comprando
              </Link>
            </div>
          </div>

          {/* Resumen + Form */}
          <div className="col-lg-5">
            {/* Resumen */}
            <div style={{
              background: "var(--bg-card)",
              border: "1px solid rgba(0,212,255,0.2)",
              borderRadius: "var(--radius-md)",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                Resumen del pedido
              </h3>

              {carrito.map(item => (
                <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "70%" }}>
                    {item.nombre} × {item.cantidad}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-primary)" }}>
                    $ {(item.precio * item.cantidad).toLocaleString("es-AR")}
                  </span>
                </div>
              ))}

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "1rem" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Total
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--accent-cyan)",
                  }}>
                    $ {totalPrecio.toLocaleString("es-AR")}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 4 }}>
                  Precio final en pesos argentinos
                </div>
              </div>
            </div>

            {/* Form */}
            <FormularioCompra
              onSubmit={handleConfirmarCompra}
              carritoVacio={carrito.length === 0}
            />
          </div>
        </div>
      </div>

      {/* Modal compra exitosa*/}
      {modalVisible && datosCompra && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-cyber" onClick={e => e.stopPropagation()}>
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

            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.2rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--accent-green)",
              marginBottom: "0.5rem",
            }}>
              ¡Compra confirmada!
            </h2>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Gracias, <strong style={{ color: "var(--text-primary)" }}>{datosCompra.nombre}</strong>. Tu pedido fue procesado.
              Recibirás las claves en <strong style={{ color: "var(--accent-cyan)" }}>{datosCompra.email}</strong>.
            </p>

            <div style={{
              background: "rgba(0,212,255,0.05)",
              border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1.5rem",
              textAlign: "left",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Detalle del pedido
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Total abonado:{" "}
                <span style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>
                  $ {totalPrecio.toLocaleString("es-AR")}
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Método: {datosCompra.entrega === "digital" ? "Clave digital por email" : datosCompra.entrega}
              </div>
            </div>

            <button className="btn-glow" onClick={handleCerrarModal} style={{ width: "100%" }}>
              <i className="bi bi-house me-2"></i>Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
