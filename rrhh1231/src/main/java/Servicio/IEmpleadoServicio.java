package Servicio;

import com.example.rrhh1231.modelos.Empleado;

import java.util.List;

public interface IEmpleadoServicio {
    public List<Empleado> listarEmpleado ();
    public Empleado BuscarEmpleadoPorId(Integer IdEmpleado);
    public Empleado guardarEmpleado(Empleado empleado);
    public  Empleado ActualizarEmpleado(Empleado empleado);
    public boolean  EliminarEmpleado (Integer IdEmpleado );

}
