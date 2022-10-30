import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from '../Button/Button'

const Header = ({ title, onAdd, showAddTask, user }) => {

  return (
    <header>
      <h1 style={headingStyle}>{title} - {user}</h1>
      {/* Only show the Add button if no current 'user' is set */}
      {user && (
        <Button
          btnText={showAddTask ? 'Close' : 'Add'}
          btnColor={showAddTask ? 'blue' : 'green'}
          onClick={onAdd}
        />
      )
      }
      {/* If no current 'user' is set, present buttons with user names for the person to choose from (to set a 'user')*/}
      {!user && (
        <Button
          btnText={'User1'}
          btnColor={'orange'}
        //onClick={some callback method to update state of 'user' to current user's name}
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