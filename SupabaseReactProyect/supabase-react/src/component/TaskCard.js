import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
    const { deleteTask, updateTask } = useTasks();
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            if (task.image_url) {
                const { data, error } = await supabase.storage
                    .from('tasks')
                    .download(task.image_url);

                if (error) {
                    console.error('Error al descargar la imagen:', error.message);
                } else {
                    const url = URL.createObjectURL(data);
                    setImageUrl(url);
                }
            }
        }

        fetchImage();

        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [task.image_url]);

    const handleDelete = () => {
        deleteTask(task);
    };

    const handleToggleDone = () => {
        updateTask(task.id, { done: !task.done });
    };

    return (
        <div className="card card-body">
            <h1 className="h5">
                {`${task.id}. ${task.name} ${task.done ? "✅" : "❌"}`}
            </h1>
            {imageUrl && (
                <img src={imageUrl} alt="Imagen de la tarea" className="img-fluid" />
            )}
            <div className="ms-auto">
                <button className="btn btn-danger btn-sm me-1" onClick={handleDelete}>
                    Borrar
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleToggleDone}>
                    {`${task.done ? "Pendiente" : "Completado"}`}
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
