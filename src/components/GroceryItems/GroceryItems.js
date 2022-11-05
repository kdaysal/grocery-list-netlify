//This component will generate a list of all of the individual grocery items

import GroceryItem from "../GroceryItem/GroceryItem"

const GroceryItems = ({ groceryListItems, onDelete, onToggle }) => {
  //initialize state of GroceryItems

  return (
    //loop thru each element of the GroceryItems array to output a list of all the individual GroceryItems
    <>
      {groceryListItems.map((groceryItem) => (
        <GroceryItem
          key={groceryItem.itemName} // I was originally using groceryItem._id here, but I'm switching to groceryItem.itemName instead because the ._id won't be created until after the item is added to my db.
          groceryItem={groceryItem}
          onDelete={() => onDelete(groceryItem._id)}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default GroceryItems

