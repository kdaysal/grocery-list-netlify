//Component to house all details relating to an individual task (grocery item)

const Task = ({ task }) => {
  return (
    <div className='task'>
      <h3>{task.text}</h3>
      <p>{task.aisle}</p>
    </div>
  )
}

export default Task
