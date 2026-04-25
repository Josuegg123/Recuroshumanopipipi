    import { useState } from "react";
    import axios from "axios";

    export default function ModalEliminarEmpleado({
    empleado,
    onEmpleadoEliminado,
    }) {
    const [loading, setLoading] = useState(false);

  const cerrarModal = () => {
    const modalEl = document.getElementById('modalEliminarEmpleado')
    const modalInstance = window.bootstrap?.Modal.getInstance(modalEl)
    modalInstance?.hide()
  }

  const eliminarEmpleado = async () => {
    try {
      setLoading(true);

      axios.delete(`http://localhost:8080/rrhh-app/empleados/${empleado?.IdEmpleado}`);

      onEmpleadoEliminado(); // recargar lista
      cerrarModal()
        } finally {
        setLoading(false);
        }
    };

    return (
        <div
        className="modal fade"
        id="modalEliminarEmpleado"
        tabIndex="-1"
        aria-hidden="true"
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">

            {/* HEADER */}
            <div className="modal-header bg-danger bg-gradient text-white border-0">
                <h5 className="modal-title fw-bold">
                🗑️ Confirmar eliminación
                </h5>
                <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                ></button>
            </div>

            {/* BODY */}
            <div className="modal-body p-4 text-center">

                <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle bg-danger bg-opacity-10"
                style={{ width: 70, height: 70 }}
                >
                <i className="bi bi-exclamation-triangle-fill text-danger fs-3"></i>
                </div>

                <h5 className="fw-bold text-dark">
                ¿Eliminar este empleado?
                </h5>

                <p className="text-muted mb-0">
                Estás a punto de eliminar a:
                </p>

                <p className="fw-semibold mt-2 mb-0 text-primary">
                {empleado?.NombresApellidos}
                </p>

                <p className="small text-muted">
                Esta acción no se puede deshacer.
                </p>
            </div>

            {/* FOOTER */}
            <div className="modal-footer border-0 bg-light px-4 py-3">

                <button
                className="btn btn-light rounded-pill px-4"
                data-bs-dismiss="modal"
                >
                Cancelar
                </button>

                <button
                className="btn btn-danger bg-gradient rounded-pill px-4 shadow-sm"
                onClick={eliminarEmpleado}
                disabled={loading}
                >
                {loading ? "Eliminando..." : "Sí, eliminar"}
                </button>

            </div>

            </div>
        </div>
        </div>
    );
    }