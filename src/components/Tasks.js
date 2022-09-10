//This component will set and update all of the individual grocery items (tasks)
import { useState } from 'react'

const Tasks = () => {
  //initialize state of tasks
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Watermelon',
        aisle: 7,
        reminder: true
      },
      {
        id: 2,
        text: 'Pizza',
        aisle: 16,
        reminder: false
      },
      {
        id: 3,
        text: 'Soup',
        aisle: 'Deli',
        reminder: false
      },
      {
        id: 4,
        text: 'Crackers',
        aisle: '4',
        reminder: true
      }
    ]
  )
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

