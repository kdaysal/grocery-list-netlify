import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from '../Button/Button'
import { AiOutlineEdit } from 'react-icons/ai';

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
  onEditShow //flips the state of showEditUser to its opposite
}) => {

  //console.log(`Header.js - visibilityFilter: ${visibilityFilter}`);

  // let allUserNames = allUserData.map((x) => x.name);
  //console.log(`allUserNames from Header.js: ${allUserNames}`);

  console.log(`userName: ${userName}`);
  return (
    <header>
      <h1 style={headingStyle}>{title} {userName ?
        '- ' + userName
        : ''} &nbsp; &nbsp;
        {userName && <AiOutlineEdit
          style={{ color: 'white' }}
          onClick={() => {
            onEditShow();
          }}
        />}
      </h1>
      {/* If no current 'user' is set, present buttons with all possible user names for the person to choose from (i.e. to set a single 'user')*/}
      {userName && (
        <h3>Now viewing: {(visibilityFilter == 'all' ? 'All items' : (visibilityFilter == 'reminder-only' ? 'Items I need' : (visibilityFilter == 'no-reminder' ? 'Items I have' : null)))}</h3>
      )
      }
      {!userName && (
        allUserData.map((user, index) =>
          <Button
            key={index}
            btnText={user.name}
            btnColor={'orange'}
            onClick={() => updateUserSession(user.name, user)}
          >
          </Button>)
      )
      }

      {/* If (user) then show a 'Change User button' */}
      {userName && (
        <Button
          btnText={'Change User'}
          btnColor={'blue'}
          onClick={() => updateUserSession('', [])}
        />
      )
      }

      {/* Only show the Add button if no current 'user' is set */}
      {userName && (
        <Button
          btnText={showAddTask ? 'Close' : 'Add Item'}
          btnColor={showAddTask ? 'blue' : 'green'}
          onClick={onAdd}
        />
      )
      }

      {/* Display 'visibility filter' buttons to let the user choose whether they want to see only 'reminder' items, only '!reminder' items, or 'all' items */}
      {((userName) && (visibilityFilter != 'all')) && (
        <Button
          btnText={'All Items'}
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
          btnText={'Items I need'}
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
          btnText={'Items I have'}
          btnColor={'orange'}
          onClick={() => {
            console.log(`Items I have clicked`)
            updateVisibilityFilter('no-reminder');
          }
          }
        />
      )
      }

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