//This component will generate a list of all of the individual grocery items

import GroceryItem from "../GroceryItem/GroceryItem"

const GroceryItems = ({
  groceryListItems,
  onDelete,
  onToggle,
  visibilityFilter,
  onEdit
}) => {

  // Only display items based on state of 'visibility filter'
  let filteredList = groceryListItems.filter((item) => {
    return (visibilityFilter === 'reminder-only') ?
      item.reminder === true :
      (visibilityFilter === 'no-reminder') ?
        item.reminder === false : true
  })

  return (
    //loop thru each element of the GroceryItems array to output a list of all the individual GroceryItems
    <>
      {filteredList.map((groceryItem) => (
        <GroceryItem
          key={groceryItem.itemName} // I was originally using groceryItem._id here, but I'm switching to groceryItem.itemName instead because the ._id won't be created until after the item is added to my db.
          groceryItem={groceryItem}
          onDelete={() => onDelete(groceryItem._id)}
          onToggle={onToggle}
          onEdit={onEdit}
        />
      ))}
    </>
  )
}

export default GroceryItems

