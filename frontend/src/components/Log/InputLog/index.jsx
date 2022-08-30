function InputLog({ data }) {
  return (
    <div className="input-container">
      <input
        type={data.type}
        name={data.name}
        placeholder={data.placeholder}
        onChange={data.onChange}
        value={data.value}
        spellCheck="false"
      ></input>
      <div
        className="email error"
        dangerouslySetInnerHTML={data.dangerouslySetInnerHTML}
      >
        {/* {data.error} */}
      </div>
    </div>
  )
}

export default InputLog
