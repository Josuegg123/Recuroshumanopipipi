export default function Navegacion({ onNuevoEmpleado }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold fs-4" href="#">
          Gestion de Recursos Humanos 🧑
        </a>

        {/* Botón responsive */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center"></ul>

          {/* Botón CTA */}
          <button
            className="btn btn-azul px-4 rounded-pill"
            onClick={onNuevoEmpleado}
          >
            Agregar Empleado
          </button>
        </div>
      </div>
    </nav>
  );
}
