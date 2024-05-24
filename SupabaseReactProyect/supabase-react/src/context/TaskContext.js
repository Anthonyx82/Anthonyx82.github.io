import { createContext, useContext, useState } from "react";
import { supabase } from "../supabase/client";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false); // Añadimos estado de carga para tareas
  const [loadingGroups, setLoadingGroups] = useState(false);

  const getGroups = async () => {
    setLoadingGroups(true);
    const user = await supabase.auth.getUser();
    const { error, data } = await supabase
      .from("groups")
      .select()
      .eq("userid", user.data.user.id)
      .order("id", { ascending: true });

    if (error) throw error;

    setGroups(data);
    setLoadingGroups(false);
    return data;
  };

  const getTasks = async (done = false, groupId = null) => {
    setLoading(true); // Indicamos que estamos cargando tareas
    const user = await supabase.auth.getUser();
    let query = supabase.from("tasks").select().eq("userid", user.data.user.id);

    if (done !== null) {
      query = query.eq("done", done);
    }

    if (groupId) {
      console.log(groupId)
      query = query.eq("groupid", groupId);
    }

    const { error, data } = await query.order("id", { ascending: true });

    if (error) throw error;

    setTasks(null);
    setTasks(data);
    setLoading(false); // Indicamos que hemos terminado de cargar tareas
  };

  const createTask = async (taskName, image, taskGroup) => {
    setAdding(true);
    try {
      console.log(taskGroup);
      const user = await supabase.auth.getUser();
      let taskData = {
        name: taskName,
        userid: user.data.user.id,
        groupid: taskGroup,
      };

      if (image) {
        const { data, error } = await supabase.storage
          .from("tasks")
          .upload(`task_images/${image.name}`, image);

        if (error) throw error;

        taskData.image_url = data.path;
      }

      const { error, data } = await supabase
        .from("tasks")
        .insert(taskData)
        .select();

      if (error) throw error;

      setTasks([...tasks, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const createGroup = async (groupName) => {
    setAdding(true);
    try {
      const user = await supabase.auth.getUser();
      const groupData = {
        name: groupName,
        userid: user.data.user.id,
      };

      const { error, data } = await supabase
        .from("groups")
        .insert(groupData)
        .select();

      if (error) throw error;

      setGroups([...groups, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (task) => {
    const user = await supabase.auth.getUser();

    const { errorIMG } = await supabase.storage
      .from("tasks")
      .remove([task.image_url]);

    if (errorIMG) throw errorIMG;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("userid", user.data.user.id)
      .eq("id", task.id)
      .select();

    if (error) throw error;

    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const updateTask = async (id, updateFields) => {
    const user = await supabase.auth.getUser();

    const { error, data } = await supabase
      .from("tasks")
      .update(updateFields)
      .eq("userid", user.data.user.id)
      .eq("id", id)
      .select();

    if (error) throw error;

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...data[0] } : task))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
        getGroups,
        groups,
        createGroup,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
