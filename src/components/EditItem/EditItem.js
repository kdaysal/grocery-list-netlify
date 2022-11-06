import { useState } from "react";

const EditItem = ({ onEdit, onSave, userId }) => {
  const [itemName, setItemName] = useState('');
  const [aisle, setAisle] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page

    console.log(`edit item form was submitted`)

    // onEdit({ itemName, aisle, reminder }, userId);

    // setItemName('');
    // setAisle('');
    // setReminder(false);
    // onSave();//set showAddTask = !showAddTask to hide the EditItem form
  }

  return (
    <form className='edit-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Edit Item</label>
        <input type='text'
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder={itemName}
        />
      </div>
      <div className='form-control'>
        <label>Edit Aisle</label>
        <input type='text'
          placeholder={aisle}
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
      <input className='btn btn-block' type='submit' value='Save Item' />
    </form>
  )
}

export default EditItem
