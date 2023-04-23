//This component will generate a list of all of the individual grocery items

import GroceryItem from "../GroceryItem/GroceryItem"

const GroceryItems = ({
  groceryListItems,
  onDelete,
  onToggle,
  visibilityFilter,
  editGroceryItem,
  onEdit,
  showEditItem
}) => {

  // Only display items based on state of 'visibility filter'
  let filteredList = groceryListItems?.filter((item) => {
    return (visibilityFilter === 'reminder-only') ?
      item.reminder === true :
      (visibilityFilter === 'no-reminder') ?
        item.reminder === false : true
  })

  // Sort the filteredList alphabetically by item name
  let sortedList = filteredList?.sort((a, b) => {
    return (a.itemName?.toLowerCase() > b.itemName?.toLowerCase()) ? 1 : -1;
  })

  return (
    //loop thru each element of the GroceryItems array to output a list of all the individual GroceryItems
    <>
      {sortedList.map((groceryItem) => (
        <GroceryItem
          key={groceryItem.itemName} // I was originally using groceryItem._id here, but I'm switching to groceryItem.itemName instead because the ._id won't be created until after the item is added to my db.
          groceryItem={groceryItem}
          onDelete={onDelete}
          onToggle={onToggle}
          editGroceryItem={editGroceryItem}
          onEdit={onEdit}
          showEditItem={showEditItem}
        />
      ))}
    </>
  )
}

export default GroceryItems

