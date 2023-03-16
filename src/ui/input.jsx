
const Input = ({label, type, value, setValue}) => {
  return (
    <div>
        <div className="form-floating">
            <input
            value={value}
            onChange={e => setValue(e.target.value)}
            type={type}
            className="form-control"
            placeholder={label}
            />
            <label htmlFor="floatingInput">{label}</label>
        </div>
    </div>
  )
}

export default Input
