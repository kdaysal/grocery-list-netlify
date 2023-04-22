import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from '../Button/Button';
import { AiOutlineEdit } from 'react-icons/ai';
import './Header.css';

const Header = ({
  title,
  onAdd,
  showAddTask,
  userName,
  user,
  allUserData,
  updateUserSession,
  visibilityFilter,
  updateVisibilityFilter,
  onEdit,
  onEditShow, //flips the state of showEditUser to its opposite
  onAddShow //flips the state of showAddUser to its opposite
}) => {

  // console.log(`user object from Header.js: ${JSON.stringify(user)}`);
  // console.log(`userName in Header.js is: ${userName}`);
  // console.log('user.groceryListItems: ', user.groceryListItems);
  // console.log('user.groceryListItems == []: ', user.groceryListItems == [])
  // console.log('user.groceryListItems == undefined: ', user.groceryListItems == undefined);
  // console.log('user.groceryListItems.length > 0: ', user.groceryListItems?.length > 0);

  return (
    <header>
      <h1 style={headingStyle}>{title} {userName ?
        ': ' + userName
        : ''}
        {userName &&
          <AiOutlineEdit
            className="edit-user-icon"
            style={{ color: 'white' }}
            onClick={() => {
              onEditShow();
            }}
          />}
      </h1>
      {/* If no user is set, show 'Add New User' button*/}
      {!userName && (
        <div className='user-button-wrapper'>
          <Button
            btnColor='green'
            btnText='Add New User'
            onClick={() => {
              onAddShow();
            }}
          >
          </Button>
        </div>
      )
      }

      {/* If no current 'user' is set, present buttons with all possible user names for the person to choose from (i.e. to set a single 'user')*/}
      {!userName && (
        allUserData.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1).map((user, index) =>
          <div className='user-button-wrapper' key={index}>
            <Button
              className="user-button"
              key={index}
              btnText={user.name}
              btnColor={'orange'}
              onClick={() => updateUserSession(user.name, user)}
            >
            </Button>
          </div>
        )
      )
      }

      {/* If (user) then show a 'Change User button' */}
      <div className="header-button">
        {userName && (
          <Button
            btnText={'Change User'}
            btnColor={'blue'}
            onClick={() => updateUserSession('', [])}
          />
        )
        }

        {/* Only show the Add Task button if no current 'user' is set */}
        {userName && (
          <Button
            btnText={showAddTask ? 'Close' : 'Add Item'}
            btnColor={showAddTask ? 'blue' : 'green'}
            onClick={onAdd}
          />
        )
        }
      </div>
      {userName && (user.groceryListItems?.length > 0) && (
        <h3 id='now-viewing'>Now viewing: {(visibilityFilter == 'all' ? 'All items' : (visibilityFilter == 'reminder-only' ? 'Items I need' : (visibilityFilter == 'no-reminder' ? 'Items I have' : null)))}</h3>
      )
      }
      {/* Display 'visibility filter' buttons to let the user choose whether they want to see only 'reminder' items, only '!reminder' items, or 'all' items */}
      <div className="show-items-button">
        {((userName) && (visibilityFilter != 'all')) && (
          <Button
            btnText={'Show All Items'}
            btnColor={'orange'}
            onClick={() => {
              console.log(`All Items clicked`)
              updateVisibilityFilter('all');
            }
            }
          />
        )
        }
        {/* Only see 'Items I need' (reminder-only) */}
        {((userName) && (visibilityFilter != 'reminder-only')) && (
          <Button
            btnText={'Show Items I need'}
            btnColor={'orange'}
            onClick={() => {
              console.log(`Items I need clicked`)
              updateVisibilityFilter('reminder-only');
            }
            }
          />
        )
        }

        {/* Only see 'Items I have' (no-reminder) */}
        {((userName) && (visibilityFilter != 'no-reminder')) && (
          <Button
            btnText={'Show Items I have'}
            btnColor={'orange'}
            onClick={() => {
              console.log(`Items I have clicked`)
              updateVisibilityFilter('no-reminder');
            }
            }
          />
        )
        }
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

const headingStyle = {
  color: 'red',
  backgroundColor: 'black',
  textAlign: 'center'

}

export default Header