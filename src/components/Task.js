//Component to house all details relating to an individual task (grocery item)

import { FaTimes } from 'react-icons/fa' //'font-awesome' icon to use for the 'X' (delete) button

const Task = ({ task }) => {
  return (
    <div className='task'>
      <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} /></h3>
      <p>{task.aisle}</p>
    </div>
  )
}

export default Task
