import { useState } from "react";
import Button from "../Button/Button";

const AddItem = ({ onAdd, onSave, userId }) => {
  const [itemName, setItemName] = useState('');
  const [aisle, setAisle] = useState('');
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();//prevent the form from submitting to a new page

    if (!itemName) {
      alert('Please add a grocery item');
      return;
    }

    onAdd({ itemName, aisle, reminder }, userId);

    setItemName('');
    setAisle('');
    setReminder(false);
    onSave();//set showAddItem = !showAddItem to hide the AddItem form
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Item</label>
        <input type='text'
          autoFocus
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder='Add Item'
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
        <label>Item I need</label>
        <input type='checkbox'
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
          checked={reminder ? true : false} //could shorten this to: checked={reminder}
        />
      </div>
      <input className='btn btn-block' type='submit' value='Save Item' />

      <Button
        btnText={'Cancel'}
        btnColor={'orange'}
        onClick={() => onSave()}
      >
      </Button>
    </form>
  )
}

export default AddItem
