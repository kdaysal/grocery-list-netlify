//This component will set and update all of the individual grocery items (tasks)


const Tasks = ({ tasks }) => {
  //initialize state of tasks

  return (
    //loop thru each element of the tasks array to output a list of all the individual tasks
    <>
      {tasks.map((task) => (
        <h3 key={task.id}>{task.text}</h3>
      ))}
    </>
  )
}

export default Tasks

