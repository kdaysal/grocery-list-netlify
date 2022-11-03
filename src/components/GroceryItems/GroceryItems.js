//This component will generate a list of all of the individual grocery items

import GroceryItem from "../GroceryItem/GroceryItem"

const GroceryItems = ({ groceryListItems, onDelete, onToggle }) => {
  //initialize state of GroceryItems

  return (
    //loop thru each element of the GroceryItems array to output a list of all the individual GroceryItems
    <>
      {groceryListItems.map((groceryItem) => (
        <GroceryItem
          key={groceryItem.id}
          groceryItem={groceryItem}
          onDelete={() => onDelete(groceryItem.id)}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default GroceryItems

