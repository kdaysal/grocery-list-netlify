const Button = ({ btnText, btnColor }) => {
  return (
    <div>
      <button className='btn' style={{ backgroundColor: btnColor }}>{btnText}</button>
    </div>
  )
}

export default Button
