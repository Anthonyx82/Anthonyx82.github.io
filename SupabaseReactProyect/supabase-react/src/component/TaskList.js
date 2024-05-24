import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import GroupCard from "./GroupCard";
import TaskListByGroup from "./TaskListByGroup";

function TaskList({ done }) { // Añade "done" como una propiedad
    const { groups } = useTasks();
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    return (
        <div>
            {selectedGroup ? (
                <TaskListByGroup done={done} group={selectedGroup} onClose={() => setSelectedGroup(null)} /> // Pasa "done" como propiedad
            ) : (
                <div>
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} onClick={() => handleGroupClick(group)} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
