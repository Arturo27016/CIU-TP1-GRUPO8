import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

const banners = [
  {
    titulo: "Cyberpunk 2077",
    subtitulo: "Night City te espera",
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    color: "#00d4ff",
  },
  {
    titulo: "Elden Ring",
    subtitulo: "Tu destino está en las Tierras Intermedias",
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    color: "#ffd700",
  },
  {
    titulo: "Baldur's Gate 3",
    subtitulo: "La aventura más épica del año",
    img: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg",
    color: "#9b59ff",
  },
];

export default function Inicio() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const destacados = productos.filter(p => p.rating >= 4.7 && p.stock > 0).slice(0, 4);
  const ofertas = productos.filter(p => p.esOferta && p.stock > 0).slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[bannerIdx];

  return (
    <div>
      {/* Primera vista */}
      <section style={{
        background: "var(--gradient-hero)",
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0",
        borderBottom: "1px solid var(--border-color)",
      }}>
        {/* Efecto de la grilla de fondo */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(var(--accent-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--accent-cyan) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container-xl position-relative">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--accent-cyan)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}>
                <i className="bi bi-stars me-2"></i>Tu tienda de juegos digitales
              </div>

              <h1 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                marginBottom: "1.5rem",
                textTransform: "uppercase",
              }}>
                Explora el{" "}
                <span style={{
                  color: "var(--accent-cyan)",
                  textShadow: "0 0 30px rgba(0, 212, 255, 0.5)",
                }}>universo</span>
                <br />
                de los{" "}
                <span style={{
                  background: "linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>videojuegos</span>
              </h1>

              <p style={{
                fontSize: "1.05rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: 480,
                marginBottom: "2rem",
              }}>
                Claves digitales originales al mejor precio. Acceso inmediato, sin esperas.
                14 títulos disponibles para PC y consolas.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/productos" className="btn-glow" style={{ padding: "0.75rem 2rem", fontSize: "0.8rem" }}>
                  <i className="bi bi-grid me-2"></i>Ver catálogo
                </Link>
                <Link to="/productos?filtro=oferta" className="btn-outline-cyan" style={{ padding: "0.75rem 2rem", fontSize: "0.8rem" }}>
                  <i className="bi bi-lightning me-2"></i>Ver ofertas
                </Link>
              </div>

              {/* Estadisticas */}
              <div className="d-flex gap-4 mt-4">
                {[
                  { val: "14", label: "Juegos" },
                  { val: "100%", label: "Original" },
                  { val: "24/7", label: "Soporte" },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "var(--accent-cyan)" }}>{s.val}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Banner slider */}
            <div className="col-lg-6">
              <div style={{
                position: "relative",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: `2px solid ${banner.color}40`,
                boxShadow: `0 0 40px ${banner.color}20`,
                transition: "all 0.5s ease",
              }}>
                <img
                  src={banner.img}
                  alt={banner.titulo}
                  style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                  onError={e => e.target.src = "https://placehold.co/600x338/16161f/00d4ff?text=GAME"}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)",
                }}>
                  <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem" }}>
                      {banner.titulo}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                      {banner.subtitulo}
                    </div>
                  </div>
                </div>

                {/* Dots */}
                <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", display: "flex", gap: 6 }}>
                  {banners.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setBannerIdx(i)}
                      style={{
                        width: i === bannerIdx ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === bannerIdx ? banner.color : "rgba(255,255,255,0.3)",
                        cursor: "pointer",
                        transition: "all 0.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container-xl">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <div>
              <h2 className="section-title">⭐ Mejor valorados</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Los títulos más aclamados del catálogo
              </p>
            </div>
            <Link to="/productos" className="btn-outline-cyan" style={{ fontSize: "0.65rem" }}>
              Ver todos →
            </Link>
          </div>
          <div className="row g-3">
            {destacados.map(p => (
              <div key={p.id} className="col-sm-6 col-xl-3 fade-in">
                <ProductoCard producto={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ofertas */}
      <section style={{ padding: "0 0 4rem", background: "linear-gradient(180deg, transparent, rgba(155,89,255,0.03), transparent)" }}>
        <div className="container-xl">
          <div className="d-flex align-items-end justify-content-between mb-4">
            <div>
              <h2 className="section-title">⚡ Ofertas activas</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Precios rebajados por tiempo limitado
              </p>
            </div>
            <Link to="/productos?filtro=oferta" className="btn-outline-cyan" style={{ fontSize: "0.65rem" }}>
              Ver todas →
            </Link>
          </div>
          <div className="row g-3">
            {ofertas.map(p => (
              <div key={p.id} className="col-sm-6 col-xl-3 fade-in">
                <ProductoCard producto={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "0 0 4rem" }}>
        <div className="container-xl">
          <div style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(155,89,255,0.08))",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: "var(--radius-lg)",
            padding: "3rem",
            textAlign: "center",
          }}>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "1rem",
            }}>
              ¿Listo para tu próxima <span style={{ color: "var(--accent-cyan)" }}>aventura</span>?
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem" }}>
              Explorá más de 14 títulos y encontrá el juego perfecto para vos.
            </p>
            <Link to="/productos" className="btn-glow" style={{ padding: "0.8rem 2.5rem", fontSize: "0.85rem" }}>
              <i className="bi bi-controller me-2"></i>Explorar catálogo completo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
