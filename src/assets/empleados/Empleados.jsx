import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Empleados({ onEditarEmpleado, onEliminarEmpleado, reloadKey }) {
  const url_base = "http://localhost:8080/rrhh-app/empleados";

  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [empleadosPorPagina, setEmpleadosPorPagina] = useState(5);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const traerEmpleados = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url_base);
        setEmpleados(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    traerEmpleados();
  }, [reloadKey]);

  const empleadosFiltrados = empleados.filter((emp) =>
    `${emp.NombresApellidos} ${emp.Departamento} ${emp.Telefono} ${emp.Salario}`
      .toLowerCase()
      .includes(busqueda.toLowerCase()),
  );

  const totalPaginas = Math.max(
    Math.ceil(empleadosFiltrados.length / empleadosPorPagina),
    1,
  );

  const paginaSegura = Math.min(Math.max(paginaActual, 1), totalPaginas);
  const indiceUltimo = paginaSegura * empleadosPorPagina;
  const indicePrimero = indiceUltimo - empleadosPorPagina;
  const empleadosActuales = empleadosFiltrados.slice(
    indicePrimero,
    indiceUltimo,
  );

  const badgeColor = (departamento) => {
    const colores = {
      Ventas: "primary",
      RRHH: "success",
      TI: "info",
      Finanzas: "warning",
      Operaciones: "secondary",
      Marketing: "danger",
    };
    return colores[departamento] || "secondary";
  };

  return (
    
    <div
      className="container-fluid py-4 px-3 px-md-4"
      style={{ background: "#f4f6fb", minHeight: "100vh" }}
    >
      {/* ── Header ── */}
      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-8">
          <h2
            className="fw-bold mb-0"
            style={{ color: "#1e293b", letterSpacing: "-0.5px" }}
          >
            <span style={{ color: "#6366f1" }}>&#9646;</span> Gestión de
            Empleados
          </h2>
          <p className="text-muted small mt-1 mb-0">
            Consulta y administra el personal de la organización
          </p>
        </div>
        <div className="col-12 col-md-4 text-md-end mt-2 mt-md-0">
          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              background: "#ede9fe",
              color: "#6366f1",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {empleadosFiltrados.length} empleado
            {empleadosFiltrados.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* ── Panel principal ── */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* ── Barra de filtros ── */}
        <div
          className="card-header border-0 py-3 px-4"
          style={{ background: "#ffffff" }}
        >
          <div className="row g-2 align-items-center">
            <div className="col-12 col-sm-7 col-lg-8">
              <div className="input-group">
                <span className="input-group-text border-0 bg-light text-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Buscar por nombre o departamento..."
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPaginaActual(1);
                  }}
                  style={{ boxShadow: "none" }}
                />
              </div>
            </div>
            <div className="col-12 col-sm-5 col-lg-4">
              <div className="input-group">
                <label className="input-group-text border-0 bg-light text-muted small">
                  Mostrar
                </label>
                <select
                  className="form-select border-0 bg-light"
                  value={empleadosPorPagina}
                  onChange={(e) => {
                    setEmpleadosPorPagina(Number(e.target.value));
                    setPaginaActual(1);
                  }}
                  style={{ boxShadow: "none" }}
                >
                  <option value={5}>5 por página</option>
                  <option value={10}>10 por página</option>
                  <option value={20}>20 por página</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Cuerpo ── */}
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                style={{ color: "#6366f1", width: "2.5rem", height: "2.5rem" }}
                role="status"
              ></div>
              <p className="text-muted mt-3 small">Cargando empleados...</p>
            </div>
          ) : (
            <>
              {/* Tabla responsive */}
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead style={{ background: "#f8fafc" }}>
                    <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                      <th
                        className="ps-4 py-3 text-uppercase small fw-semibold"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        ID
                      </th>
                      <th
                        className="py-3 text-uppercase small fw-semibold"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        Nombre
                      </th>
                      <th
                        className="py-3 text-uppercase small fw-semibold d-none d-md-table-cell"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        Teléfono
                      </th>
                      <th
                        className="py-3 text-uppercase small fw-semibold"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        Departamento
                      </th>
                      <th
                        className="pe-4 py-3 text-uppercase small fw-semibold text-end"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        Salario
                      </th>
                      <th
                        className="pe-4 py-3 text-uppercase small fw-semibold text-end"
                        style={{ color: "#94a3b8", letterSpacing: "0.06em" }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleadosActuales.length > 0 ? (
                      empleadosActuales.map((emp) => (
                        <tr
                          key={emp.IdEmpleado}
                          style={{
                            borderBottom: "1px solid #f1f5f9",
                            transition: "background 0.15s",
                          }}
                        >
                          {/* ID */}
                          <td className="ps-4">
                            <span
                              className="badge rounded-2 px-2 py-1"
                              style={{
                                background: "#f1f5f9",
                                color: "#64748b",
                                fontFamily: "monospace",
                                fontSize: "0.78rem",
                              }}
                            >
                              #{emp.IdEmpleado}
                            </span>
                          </td>

                          {/* Nombre con avatar */}
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                                style={{
                                  width: 36,
                                  height: 36,
                                  background: `hsl(${(emp.IdEmpleado * 57) % 360}, 65%, 92%)`,
                                  color: `hsl(${(emp.IdEmpleado * 57) % 360}, 55%, 38%)`,
                                  fontWeight: 700,
                                  fontSize: "0.8rem",
                                }}
                              >
                                {emp.NombresApellidos?.charAt(0) ?? "?"}
                              </div>
                              <span
                                className="fw-medium"
                                style={{
                                  color: "#1e293b",
                                  fontSize: "0.92rem",
                                }}
                              >
                                {emp.NombresApellidos}
                              </span>
                            </div>
                          </td>

                          {/* Teléfono — oculto en móvil */}
                          <td className="d-none d-md-table-cell text-muted small">
                            {emp.Telefono}
                          </td>

                          {/* Departamento */}
                          <td>
                            <span
                              className={`badge bg-${badgeColor(emp.Departamento)}-subtle text-${badgeColor(emp.Departamento)}-emphasis rounded-pill px-3 py-1`}
                              style={{ fontSize: "0.78rem", fontWeight: 500 }}
                            >
                              {emp.Departamento}
                            </span>
                          </td>

                          {/* Salario */}
                          <td className="pe-4 text-end">
                            <span
                              className="fw-semibold"
                              style={{
                                color: emp.Salario < 0 ? "#dc2626" : "#16a34a",
                                fontSize: "0.95rem",
                              }}
                            >
                              $
                              {emp.Salario?.toLocaleString("es-PE", {
                                minimumFractionDigits: 2,
                              }) ?? "0.00"}
                            </span>
                          </td>
                          <td className="pe-4 text-end">
                            <button
                              className="btn btn-sm btn-outline-warning me-2"
                              title="Editar"
                              onClick={() => onEditarEmpleado(emp)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              className="btn btn-sm btn-outline-danger"
                              title="Eliminar"
                              onClick={() => onEliminarEmpleado(emp)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">
                          <div style={{ fontSize: "2rem" }}>🔍</div>
                          <p className="mt-2 mb-0">
                            No se encontraron resultados para{" "}
                            <strong>"{busqueda}"</strong>
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* ── Footer: info + paginación ── */}
              <div
                className="px-4 py-3 d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2"
                style={{
                  background: "#f8fafc",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <p className="text-muted small mb-0">
                  Mostrando{" "}
                  <strong>
                    {indicePrimero + 1}–
                    {Math.min(indiceUltimo, empleadosFiltrados.length)}
                  </strong>{" "}
                  de <strong>{empleadosFiltrados.length}</strong> registros
                </p>

                <nav>
                  <ul className="pagination pagination-sm mb-0 gap-1">
                    {/* Anterior */}
                    <li
                      className={`page-item ${paginaSegura === 1 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link rounded-3 border-0"
                        style={{
                          color: "#6366f1",
                          background:
                            paginaSegura === 1 ? "#f1f5f9" : "#ede9fe",
                        }}
                        onClick={() =>
                          setPaginaActual((p) => Math.max(p - 1, 1))
                        }
                      >
                        ‹
                      </button>
                    </li>

                    {/* Números */}
                    {Array.from({ length: totalPaginas }, (_, i) => (
                      <li key={i} className="page-item">
                        <button
                          className="page-link rounded-3 border-0 fw-medium"
                          style={{
                            background:
                              paginaSegura === i + 1
                                ? "#6366f1"
                                : "transparent",
                            color: paginaSegura === i + 1 ? "#fff" : "#64748b",
                            minWidth: "32px",
                          }}
                          onClick={() => setPaginaActual(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    {/* Siguiente */}
                    <li
                      className={`page-item ${paginaSegura === totalPaginas ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link rounded-3 border-0"
                        style={{
                          color: "#6366f1",
                          background:
                            paginaSegura === totalPaginas
                              ? "#f1f5f9"
                              : "#ede9fe",
                        }}
                        onClick={() =>
                          setPaginaActual((p) => Math.min(p + 1, totalPaginas))
                        }
                      >
                        ›
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
