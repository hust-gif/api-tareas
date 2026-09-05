package com.tareas.apitareas.service;

import com.tareas.apitareas.model.Tarea;
import com.tareas.apitareas.repository.TareaRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class TareaService {

    private final TareaRepository repositorio;

    public TareaService(TareaRepository repositorio) {
        this.repositorio = repositorio;
    }

    public List<Tarea> listar() {
        return repositorio.findAll();
    }

    public Tarea buscarPorId(Long id) {
        return repositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la tarea con ID " + id
                ));
    }

    public Tarea crear(Tarea tarea) {
        tarea.setId(null);
        return repositorio.save(tarea);
    }

    public Tarea actualizar(Long id, Tarea datos) {
        Tarea tareaExistente = buscarPorId(id);

        tareaExistente.setTitulo(datos.getTitulo());
        tareaExistente.setDescripcion(datos.getDescripcion());
        tareaExistente.setCompletada(datos.getCompletada());
        tareaExistente.setFechaLimite(datos.getFechaLimite());

        return repositorio.save(tareaExistente);
    }

    public void eliminar(Long id) {
        Tarea tareaExistente = buscarPorId(id);
        repositorio.delete(tareaExistente);
    }
}