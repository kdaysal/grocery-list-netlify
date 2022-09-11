import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [aisle, setAisle] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page

    if (!text) {
      alert('Please add a grocery item');
      return;
    }

    onAdd({ text, aisle, reminder });

    setText('');
    setAisle('');
    setReminder(false);
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task</label>
        <input type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Add Task'
        />
      </div>
      <div className='form-control'>
        <label>Aisle</label>
        <input type='text'
          placeholder='Add Aisle'
          value={aisle}
          onChange={(e) => setAisle(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input type='checkbox'
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          checked={reminder ? true : false} //could shorten this to: checked={reminder}
        />
      </div>
      <input className='btn btn-block' type='submit' value='Save Task' />
    </form>
  )
}

export default AddTask
