//This component will generate a list of all of the individual grocery items (tasks)

import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {
  //initialize state of tasks

  return (
    //loop thru each element of the tasks array to output a list of all the individual tasks
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={() => onDelete(task.id)}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default Tasks

