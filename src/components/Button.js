import PropTypes from 'prop-types'

const Button = ({ btnText, btnColor }) => {
  return (
    <div>
      <button className='btn' style={{ backgroundColor: btnColor }}>{btnText}</button>
    </div>
  )
}

Button.defaultProps = {
  color: 'steelblue'
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  btnColor: PropTypes.string
}

export default Button
