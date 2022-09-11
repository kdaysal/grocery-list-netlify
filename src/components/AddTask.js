const AddTask = () => {
  return (
    <form className='add-form'>
      <div className='form-control'>
        <label>Task</label>
        <input type='text' placeholder='Add Task' />
      </div>
      <div className='form-control'>
        <label>Aisle</label>
        <input type='text' placeholder='Add Aisle' />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox' />
      </div>
      <input className='btn btn-block' type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask
