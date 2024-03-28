const MCQButton = (inputData) => {
    const {option, position, socket, lecturer, pressed, handleMCQ} = inputData
    const buttonColour = pressed ? {backgroundColor: "red"} : {backgroundColor: "goldenrod"}

    return(
        <button style={buttonColour} key={option} className={pressed ? "pOption" : "unpOption"} onClick={() => handleMCQ(option, position)}>
            {option.includes("<code>") ? option[0] : option}
        </button>
    )
}

export default MCQButton