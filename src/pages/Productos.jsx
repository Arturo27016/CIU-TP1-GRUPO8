import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productos, categorias } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

export default function Productos() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [busqueda, setBusqueda] = useState(searchParams.get("q") || "");
  const [categoriaActiva, setCategoriaActiva] = useState(searchParams.get("cat") || "Todas");
  const [ordenamiento, setOrdenamiento] = useState(searchParams.get("orden") || "default");
  const [soloStock, setSoloStock] = useState(false);
  const [soloOfertas, setSoloOfertas] = useState(searchParams.get("filtro") === "oferta");

  // Sincronizar parametros en URL
  useEffect(() => {
    const params = {};
    if (busqueda) params.q = busqueda;
    if (categoriaActiva !== "Todas") params.cat = categoriaActiva;
    if (ordenamiento !== "default") params.orden = ordenamiento;
    if (soloOfertas) params.filtro = "oferta";
    setSearchParams(params);
  }, [busqueda, categoriaActiva, ordenamiento, soloOfertas]);

  const productosFiltrados = productos
    .filter(p => {
      const matchBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase());
      const matchCategoria = categoriaActiva === "Todas" || p.categoria === categoriaActiva;
      const matchStock = soloStock ? p.stock > 0 : true;
      const matchOfertas = soloOfertas ? p.esOferta : true;
      return matchBusqueda && matchCategoria && matchStock && matchOfertas;
    })
    .sort((a, b) => {
      if (ordenamiento === "precio-asc") return a.precio - b.precio;
      if (ordenamiento === "precio-desc") return b.precio - a.precio;
      if (ordenamiento === "rating") return b.rating - a.rating;
      return 0;
    });

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoriaActiva("Todas");
    setOrdenamiento("default");
    setSoloStock(false);
    setSoloOfertas(false);
  };

  const hayFiltros = busqueda || categoriaActiva !== "Todas" || ordenamiento !== "default" || soloStock || soloOfertas;

  return (
    <div className="page-wrapper">
      <div className="container-xl">
        {/* Header */}
        <div className="mb-4">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent-cyan)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            <i className="bi bi-grid me-2"></i>Catálogo
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "2rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}>
            Todos los <span style={{ color: "var(--accent-cyan)" }}>juegos</span>
          </h1>
        </div>

        {/* Contenedor de filtros */}
        <div style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "var(--radius-md)",
          padding: "1.25rem",
          marginBottom: "2rem",
        }}>
          <div className="row g-3 align-items-center">
            {/* Buscador */}
            <div className="col-md-4">
              <div style={{ position: "relative" }}>
                <i className="bi bi-search" style={{
                  position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                  color: "var(--text-muted)", fontSize: "0.85rem",
                }} />
                <input
                  type="text"
                  className="input-cyber"
                  placeholder="Buscar juegos..."
                  value={busqueda}
                  onChange={e => setBusqueda(e.target.value)}
                  style={{ paddingLeft: "2.2rem" }}
                />
              </div>
            </div>

            {/* Orden */}
            <div className="col-md-3">
              <select
                className="input-cyber"
                value={ordenamiento}
                onChange={e => setOrdenamiento(e.target.value)}
                style={{ cursor: "pointer" }}
              >
                <option value="default">Ordenar por defecto</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
              </select>
            </div>

            {/* Toggle de stock y oferta */}
            <div className="col-md-3 d-flex gap-3">
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={soloStock}
                  onChange={e => setSoloStock(e.target.checked)}
                  style={{ accentColor: "var(--accent-cyan)" }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)" }}>Con stock</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={soloOfertas}
                  onChange={e => setSoloOfertas(e.target.checked)}
                  style={{ accentColor: "var(--accent-orange)" }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)" }}>Solo ofertas</span>
              </label>
            </div>

            {/* Limpiar filtros */}
            {hayFiltros && (
              <div className="col-md-2">
                <button
                  className="btn-danger-custom"
                  onClick={limpiarFiltros}
                  style={{ width: "100%", fontSize: "0.65rem" }}
                >
                  <i className="bi bi-x-circle me-1"></i>Limpiar
                </button>
              </div>
            )}
          </div>

          {/* Categorías */}
          <div className="d-flex flex-wrap gap-2 mt-3">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                style={{
                  background: categoriaActiva === cat ? "var(--accent-cyan)" : "transparent",
                  border: `1px solid ${categoriaActiva === cat ? "var(--accent-cyan)" : "var(--border-color)"}`,
                  color: categoriaActiva === cat ? "#000" : "var(--text-secondary)",
                  fontFamily: "var(--font-display)",
                  fontSize: "0.6rem",
                  fontWeight: categoriaActiva === cat ? 700 : 400,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "3px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resultado de los filtros */}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          Mostrando <span style={{ color: "var(--accent-cyan)" }}>{productosFiltrados.length}</span> de {productos.length} juegos
          {busqueda && <> para "<span style={{ color: "var(--text-secondary)" }}>{busqueda}</span>"</>}
          {categoriaActiva !== "Todas" && <> · Categoría: <span style={{ color: "var(--accent-purple)" }}>{categoriaActiva}</span></>}
        </div>

        {/* Grilla */}
        {productosFiltrados.length > 0 ? (
          <div className="row g-3">
            {productosFiltrados.map((p, idx) => (
              <div
                key={p.id}
                className="col-sm-6 col-lg-4 col-xl-3"
                style={{ animation: `fadeIn 0.3s ease ${idx * 0.05}s both` }}
              >
                <ProductoCard producto={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <i className="bi bi-controller"></i>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "0.05em" }}>
              No se encontraron juegos
            </p>
            <p style={{ fontSize: "0.9rem" }}>Probá con otros filtros o términos de búsqueda.</p>
            <button className="btn-outline-cyan mt-3" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
