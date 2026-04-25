package com.example.rrhh1231.Controlador;

import Servicio.IEmpleadoServicio;
import com.example.rrhh1231.modelos.Empleado;
import com.example.rrhh1231.repositorio.EmpleadoRepositorio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

//http://localhost:8080/rrhh-app
@RequestMapping("/rrhh-app")
@CrossOrigin(value = "http://localhost:5173")

public class EmpleadoController {

    private static final Logger logger= LoggerFactory.getLogger(EmpleadoController.class);

    @Autowired
    private IEmpleadoServicio  EmpleadoServicio;


    //listarEmpleado
    //http://localhost:8080/rrhh-app/empleados

    @GetMapping("/empleados")
    public List<Empleado> ObtenerEmpleados() {
        var  empleados = EmpleadoServicio.listarEmpleado();

        empleados.forEach(empleado-> logger.info(empleado.toString()));
        return empleados;
    }

    @PostMapping("/AgregarEmpleados")
    public Empleado AgregarEmpleado(@RequestBody Empleado empleado) {

        logger.info("Empleado recibido: " + empleado);

        // FORZAR null si viene 0
        if (empleado.getIdEmpleado() != null && empleado.getIdEmpleado() == 0) {
            empleado.setIdEmpleado(null);
        }

        if (empleado.getIdEmpleado() == null) {
            return EmpleadoServicio.guardarEmpleado(empleado);
        } else {
            return EmpleadoServicio.ActualizarEmpleado(empleado);
        }
    }


    //http://localhost:8080/rrhh-app/ObtenerPorId
    @GetMapping("/ObtenerPorId")
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@RequestParam Integer idEmpleado) {

        Empleado empleado = EmpleadoServicio.BuscarEmpleadoPorId(idEmpleado);

        if (empleado == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(empleado);
    }

    //http://localhost:8080/rrhh-app/EliminarPorId
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {

        EmpleadoServicio.EliminarEmpleado(id);

        return ResponseEntity.noContent().build();
    }


}
