//Component to house all details relating to an individual grocery item

import { FaTimes } from 'react-icons/fa' //'font-awesome' icon to use for the 'X' (delete) button

const GroceryItem = ({ groceryItem, onDelete, onToggle }) => {
  return (
    <div className={`groceryItem ${groceryItem.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(groceryItem.id)}>
      <h3>{groceryItem.itemName} <FaTimes style={{ color: 'red', cursor: 'pointer' }}
        onClick={onDelete}
      />
      </h3>
      <p>Aisle/Dept: {groceryItem.aisle}</p>
    </div>
  )
}

export default GroceryItem;
