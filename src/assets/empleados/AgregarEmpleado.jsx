import { useState } from "react";

export default function ModalEmpleado({ empleadoInicial, modo = "nuevo", onEmpleadoGuardado }) {
  const [empleado, setEmpleado] = useState({
    IdEmpleado: empleadoInicial?.IdEmpleado ?? 0,
    NombresApellidos: empleadoInicial?.NombresApellidos ?? "",
    Departamento: empleadoInicial?.Departamento ?? "",
    Salario: empleadoInicial?.Salario ?? "",
    Telefono: empleadoInicial?.Telefono ?? ""
  });

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const guardarEmpleado = async () => {
    try {
      await onEmpleadoGuardado(empleado);
      setEmpleado({
        IdEmpleado: 0,
        NombresApellidos: "",
        Departamento: "",
        Salario: "",
        Telefono: "",
      });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };


  return (
    <div
      className="modal fade"
      id="modalEmpleado"
      tabIndex="-1"
      aria-labelledby="modalEmpleadoLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        {/* Agregado border-0 y shadow-lg para un look más limpio y moderno */}
        <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
          
          {/* Header: Degradado azul/primario sin bordes inferiores duros */}
          <div className="modal-header bg-primary bg-gradient text-white border-0 p-4">
            <h5 className="modal-title fw-bold" id="modalEmpleadoLabel">
              {modo === "editar" ? "✏️ Editar Empleado" : "✨ Nuevo Empleado"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body: Mayor espaciado (p-4) */}
          <div className="modal-body p-4 bg-light">
            <div className="row g-4">
              <input hidden name="IdEmpleado" value={empleado.IdEmpleado} readOnly />
              {/* Usando Form Floating de Bootstrap 5 */}
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control shadow-sm border-0"
                    id="NombresApellidos"
                    name="NombresApellidos"
                    placeholder="Nombre completo"
                    value={empleado.NombresApellidos}
                    onChange={handleChange}
                  />
                  <label htmlFor="NombresApellidos" className="text-muted">Nombre completo</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control shadow-sm border-0"
                    id="Telefono"
                    name="Telefono"
                    placeholder="Teléfono"
                    value={empleado.Telefono}
                    onChange={handleChange}
                  />
                  <label htmlFor="Telefono" className="text-muted">Teléfono</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control shadow-sm border-0"
                    id="Departamento"
                    name="Departamento"
                    placeholder="Departamento"
                    value={empleado.Departamento}
                    onChange={handleChange}
                  />
                  <label htmlFor="Departamento" className="text-muted">Departamento</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="number"
                    className="form-control shadow-sm border-0"
                    id="Salario"
                    name="Salario"
                    placeholder="Salario"
                    value={empleado.Salario}
                    onChange={handleChange}
                  />
                  <label htmlFor="Salario" className="text-muted">Salario</label>
                </div>
              </div>

            </div>
          </div>

          {/* Footer: Fondo sutilmente diferente para separar las acciones */}
          <div className="modal-footer border-0 bg-white p-4 pt-2">
            <button
              type="button"
              className="btn btn-light px-4 rounded-pill shadow-sm"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-primary bg-gradient px-4 rounded-pill shadow-sm"
              onClick={guardarEmpleado}
              data-bs-dismiss="modal"
            >
              {modo === "editar" ? "Actualizar Empleado" : "Guardar Empleado"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}