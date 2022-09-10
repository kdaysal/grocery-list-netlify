import PropTypes from 'prop-types'//prop-types is totally optional for a small app like this - I'm adding it here for reference
import Button from './Button'

const Header = ({ title }) => {
  const onClick = () => {
    console.log(`button clicked!`)
  }

  return (
    <header>
      <h1 style={{ color: 'red', backgroundColor: 'black' }}>{title}</h1>
      <Button
        btnText="Add"
        btnColor='green'
        onClick={onClick}
      />
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

//For sake of example - you can also define styles separately at the bottom like this...
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black'
// }
//and if I wanted to call them, the syntax would be like this for example: <h1 style={headingStyle}>{title}</h1>


export default Header