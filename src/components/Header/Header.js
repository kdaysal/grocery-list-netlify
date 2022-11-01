import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from '../Button/Button'

const Header = ({ title, onAdd, showAddTask, userName, allUserData }) => {

  console.log(`allUserData.length from Header.js: ${allUserData.length}`); // for testing only -this just proves that the useEffect() hook in App.js had to have completed updating allUserData before passing it as a prop down to the Header.js component.

  let allUserNames = allUserData.map((x) => x.name);
  console.log(`allUserNames from Header.js: ${allUserNames}`);

  return (
    <header>
      <h1 style={headingStyle}>{title} - {userName}</h1>
      {/* Only show the Add button if no current 'user' is set */}
      {userName && (
        <Button
          btnText={showAddTask ? 'Close' : 'Add'}
          btnColor={showAddTask ? 'blue' : 'green'}
          onClick={onAdd}
        />
      )
      }
      {/* If no current 'user' is set, present buttons with all possible user names for the person to choose from (i.e. to set a single 'user')*/}
      {!userName && (
        allUserData.map((x, index) =>
          <Button
            key={index}
            btnText={x.name}
            btnColor={'orange'}
          >
          </Button>)
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