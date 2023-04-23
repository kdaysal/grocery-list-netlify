//Component to house all details relating to an individual grocery item

import { FaTimes } from 'react-icons/fa'; //'font-awesome' icon to use for the 'X' (delete) button
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';

const GroceryItem = ({
  groceryItem,
  onDelete,
  onToggle,
  editGroceryItem, //calls editGroceryItem function in App.js
  onEdit, //flips the state of showEditItems to its opposite
  showEditItem
}) => {

   //console.log(`groceryItem in GroceryItem.js is: ${JSON.stringify(groceryItem)}`);
  
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
        {!showEditItem && <AiOutlineEdit
          onClick={() => {
            editGroceryItem(groceryItem._id, groceryItem.itemName, groceryItem.aisle, groceryItem.reminder);
            onEdit();
          }
          }
        />}
        <FaTimes style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => {

            if (window.confirm(`Are you sure you want to delete this item with id: ${groceryItem._id} and name: ${groceryItem.itemName}?`)) {
              onDelete(groceryItem._id, groceryItem.itemName)
            }
          }}
        />
      </h3>

      <p>Aisle/Dept: {groceryItem.aisle}</p>
    </div>
  )
}

export default GroceryItem;
