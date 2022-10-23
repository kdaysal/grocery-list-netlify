import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from '../Button/Button'

const Header = ({ title, onAdd, showAddTask, user }) => {

  return (
    <header>
      <h1 style={headingStyle}>{title} - {user}</h1>
      <Button
        btnText={showAddTask ? 'Close' : 'Add'}
        btnColor={showAddTask ? 'blue' : 'green'}
        onClick={onAdd}
      />
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