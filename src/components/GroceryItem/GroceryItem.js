//Component to house all details relating to an individual grocery item

import { FaTimes } from 'react-icons/fa'; //'font-awesome' icon to use for the 'X' (delete) button
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

const GroceryItem = ({
  groceryItem,
  onDelete,
  onToggle,
  onEdit
}) => {

  console.log(`groceryItem is: ${JSON.stringify(groceryItem)}`);
  return (
    <div className={`groceryItem ${groceryItem.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(groceryItem._id)}>
      <h3>{groceryItem.itemName}
        {!groceryItem.reminder && <BsToggleOff
          onClick={() => onToggle(groceryItem._id)}
        />
        }
        {groceryItem.reminder && <BsToggleOn
          onClick={() => onToggle(groceryItem._id)}
        />
        }
        <AiOutlineEdit
          onClick={() => onEdit(groceryItem._id)}
        />
        <FaTimes style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(groceryItem._id)}
        />
      </h3>

      <p>Aisle/Dept: {groceryItem.aisle}</p>
    </div>
  )
}

export default GroceryItem;
