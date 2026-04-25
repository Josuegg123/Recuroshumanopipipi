package com.example.rrhh1231.servicio;
import Servicio.IEmpleadoServicio;
import com.example.rrhh1231.modelos.Empleado;
import com.example.rrhh1231.repositorio.EmpleadoRepositorio;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoServicio implements IEmpleadoServicio {

    private final EmpleadoRepositorio empleadoRepositorio;

    public EmpleadoServicio(EmpleadoRepositorio empleadoRepositorio) {
        this.empleadoRepositorio = empleadoRepositorio;
    }

    @Override
    public List<Empleado> listarEmpleado() {
        return empleadoRepositorio.findAll();
    }

    @Override
    public Empleado BuscarEmpleadoPorId(Integer IdEmpleado) {
        return empleadoRepositorio.findById(IdEmpleado).orElse(null);
    }

    @Override
    public Empleado guardarEmpleado(Empleado empleado) {
        return empleadoRepositorio.save(empleado);
    }



    @Override
    public  Empleado ActualizarEmpleado (Empleado empleado) {
        return empleadoRepositorio.findById(empleado.getIdEmpleado()).orElse(null);
    }

    @Override
    public boolean EliminarEmpleado(Integer IdEmpleado) {
        empleadoRepositorio.deleteById(IdEmpleado);
        return true;
    }

}