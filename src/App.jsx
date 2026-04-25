import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Empleados from './assets/empleados/Empleados'
import Navegacion from './assets/plantilla/Navegacion'
import AgregarEmpleado from './assets/empleados/AgregarEmpleado'
import ModalEliminarEmpleado from './assets/empleados/EliminarEmpleado'

const empleadoInicial = {
  IdEmpleado: 0,
  NombresApellidos: '',
  Departamento: '',
  Salario: 0,
  Telefono: '',
}

function App() {
  const [empleadoModal, setEmpleadoModal] = useState(empleadoInicial)
  const [modoModal, setModoModal] = useState('nuevo')
  const [reloadKey, setReloadKey] = useState(0)
  const [modalOpenCount, setModalOpenCount] = useState(0)
  const [empleadoEliminar, setEmpleadoEliminar] = useState(null)
  const [deleteModalOpenCount, setDeleteModalOpenCount] = useState(0)

  const abrirNuevoEmpleado = () => {
    setEmpleadoModal(empleadoInicial)
    setModoModal('nuevo')
    setModalOpenCount((count) => count + 1)
  }

  const abrirEditarEmpleado = (empleado) => {
    setEmpleadoModal({
      ...empleado,
      Salario: empleado.Salario ?? 0,
    })
    setModoModal('editar')
    setModalOpenCount((count) => count + 1)
  }

  const abrirEliminarEmpleado = (empleado) => {
    setEmpleadoEliminar(empleado)
    setDeleteModalOpenCount((count) => count + 1)
  }

  const handleEmpleadoEliminado = () => {
    setReloadKey((k) => k + 1)
  }

  const handleEmpleadoGuardado = async (empleado) => {
    try {
      await axios.post('http://localhost:8080/rrhh-app/AgregarEmpleados', empleado)
    } catch (error) {
      console.error('Error al guardar el empleado:', error)
    } finally {
      setReloadKey((k) => k + 1)
    }
  }

  useEffect(() => {
    if (!modalOpenCount) return

    const modalEl = document.getElementById('modalEmpleado')
    if (!modalEl) return

    const bsModal = window.bootstrap?.Modal.getOrCreateInstance(modalEl)
    bsModal?.show()
  }, [modalOpenCount])

  useEffect(() => {
    if (!deleteModalOpenCount || !empleadoEliminar) return

    const modalEl = document.getElementById('modalEliminarEmpleado')
    if (!modalEl) return

    const bsModal = window.bootstrap?.Modal.getOrCreateInstance(modalEl)
    bsModal?.show()
  }, [deleteModalOpenCount, empleadoEliminar])

  return (
    <div>
      <Navegacion onNuevoEmpleado={abrirNuevoEmpleado} />
      <Empleados
        onEditarEmpleado={abrirEditarEmpleado}
        onEliminarEmpleado={abrirEliminarEmpleado}
        reloadKey={reloadKey}
      />
      <AgregarEmpleado
        key={`${modoModal}-${empleadoModal.IdEmpleado}`}
        empleadoInicial={empleadoModal}
        modo={modoModal}
        onEmpleadoGuardado={handleEmpleadoGuardado}
      />
      <ModalEliminarEmpleado
        key={`${empleadoEliminar?.IdEmpleado ?? 0}-${deleteModalOpenCount}`}
        empleado={empleadoEliminar}
        onEmpleadoEliminado={handleEmpleadoEliminado}
      />
    </div>
  )
}

export default App
