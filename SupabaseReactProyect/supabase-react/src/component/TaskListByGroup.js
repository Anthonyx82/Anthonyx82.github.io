import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import jsPDF from 'jspdf';

function TaskListByGroup({ done, group, onClose }) {
    const { tasks, getTasks, loading } = useTasks();

    useEffect(() => {
        console.log(group.id);
        getTasksByGroup(done, group.id);
    }, [done, group]);

    function getTasksByGroup(done, groupId) {
        getTasks(done, groupId);
    }

    function generatePDF() {
        const doc = new jsPDF();
        if (done) {
            doc.text(`Listado de tareas completadas para el grupo: ${group.name}`, 10, 10);
        } else {
            doc.text(`Listado de tareas pendientes para el grupo: ${group.name}`, 10, 10);
        }

        
        
        let y = 20;
        tasks.forEach(task => {
            doc.text(`- ${task.name}`, 10, y);
            y += 10;
        });

        doc.save(`tareas_${group.name}.pdf`);
    }

    return (
        <div>
            <button className="btn btn-dark btn-sm" onClick={onClose}>Volver a la lista de grupos</button>
            <button className="btn btn-dark btn-sm" onClick={generatePDF}>Generar PDF</button>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {tasks.length === 0 ? (
                        <p>No hay tareas en este grupo</p>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default TaskListByGroup;
