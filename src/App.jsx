import React, { useRef, useState, useEffect } from 'react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";

const App = () => {
  const [layoutName, setLayoutName] = useState("default");
  const [inputName, setInputName] = useState("input1");
  const [input, setInput] = useState({});
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboard = useRef();

  const onChangeAll = inputObj => {
    setInput(inputObj);
    console.log("Input changed", inputObj);
  };

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (keyboardOpen && keyboard.current && !keyboard.current.contains(e.target)) {
        setKeyboardOpen(false)
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside, { capture: true })

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside, { capture: true })
    }
  }, [keyboardOpen, keyboard])

  const onKeyPress = button => {
    console.log("Button pressed", button);
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();

    if (button === "{clear}") clearScreen();
  };

  const handleShift = () => {

    setLayoutName(layoutName === "default" ? "shift" : "default")
  };

  const onChangeInput = event => {
    let inputVal = event.target.value;

    let updatedInputObj = {
      input,
      [inputName]: inputVal
    };
    setInput(updatedInputObj);
    keyboard.current.setInput(inputVal);
  };

  const setActiveInput = (inputName, layoutName) => {
    setLayoutName(layoutName);
    setInputName(inputName);
    setKeyboardOpen(true);
    console.log("Active input", inputName);
  };

  const closeKeyboard = () => {
    setKeyboardOpen(false);
  };

  const submit = () => {
    console.log(input);
  };

  const clearScreen = () => {
    let newInput = input;
    let newInputName = inputName;
    newInput[newInputName] = "";
    setInput(newInput)
  };



  return (
    <div>
      <div className="inputsContainer">
        <input
          onFocus={() => setActiveInput("input1", "ip")}
          value={input["input1"] || ""}
          placeholder={"Input 1"}
          onChange={e => onChangeInput(e)}
        />
        <input
          onFocus={() => setActiveInput("input2", "default")}
          value={input["input2"] || ""}
          placeholder={"Input 2"}
          onChange={e => onChangeInput(e)}
        />
        <input
          onFocus={() => setActiveInput("input3", "default")}
          value={input["input3"] || ""}
          placeholder={"Input 3"}
          onChange={e => onChangeInput(e)}
        />
        <input
          onFocus={() => setActiveInput("input4", "default")}
          value={input["input4"] || ""}
          placeholder={"Input 4"}
          onChange={e => onChangeInput(e)}
        />
        <input
          onFocus={() => setActiveInput("input5", "ip")}
          value={input["input5"] || ""}
          placeholder={"Input 5"}
          onChange={e => onChangeInput(e)}
        />
        <input
          onFocus={() => setActiveInput("input6", "ip")}
          value={input["input6"] || ""}
          placeholder={"Input 6"}
          onChange={e => onChangeInput(e)}
        />
      </div>
      <div ref={r => (keyboard.current = r)} className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""} ${layoutName === "ip" ? "numPad" : "defaultKeyboard"}`}>
        <Keyboard
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={inputObj => onChangeAll(inputObj)}
          onKeyPress={button => onKeyPress(button)}
          layout={{
            ip: ["1 2 3", "4 5 6", "7 8 9", ". 0 {clear}", "{cancel} {enter}"],
            default: [
              "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
              "{tab} q w e r t y u i o p [ ] \\",
              "{lock} a s d f g h j k l ; ' {enter}",
              "{shift} z x c v b n m , . / {shift}",
              ".com @ {space}",
            ],
            shift: [
              "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
              "{tab} Q W E R T Y U I O P { } |",
              '{lock} A S D F G H J K L : " {enter}',
              "{shift} Z X C V B N M < > ? {shift}",
              ".com @ {space}",
            ],
          }}
          display={{
            "{clear}": "C",
            "{cancel}": "cancel",
            "{enter}": "enter",
            "{lock}": "caps lock",
            "{shift}": "shift",
            "{space}": "space",
            "{bksp}": "backspace",
            "{tab}": "tab"
          }}
        />
        <button className="submitBtn" onClick={submit}>
          Submit
        </button>
        <button className="closeBtn" onClick={closeKeyboard}>
          Close Keyboard
        </button>
      </div>
    </div >
  );
}

export default App;
