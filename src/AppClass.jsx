import React, { Component } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./index.css";
import OutSideAlerter from "./OutsideAlerter";


class App extends Component {

  state = {
    layoutName: "ip",
    inputName: "input1",
    input: {}
  };

  onChangeAll = inputObj => {
    this.setState({
      input: inputObj
    });

    console.log("Input changed", inputObj);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();

    if (button === "{clear}") this.clearScreen();
  };

  handleShift = () => {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    let inputVal = event.target.value;

    let updatedInputObj = {
      ...this.state.input,
      [this.state.inputName]: inputVal
    };

    this.setState(
      {
        input: updatedInputObj
      },
      () => {
        this.keyboard.setInput(inputVal);
      }
    );
  };

  setActiveInput = inputName => {
    this.setState(
      {
        inputName: inputName,
        keyboardOpen: true
      },
      () => {
        console.log("Active input", inputName);
      }
    );
  };

  closeKeyboard = () => {
    this.setState({
      keyboardOpen: false
    });
  };

  submit = () => {
    console.log(this.state.input);
  };

  clearScreen = () => {
    let input = { ...this.state.input };
    let inputName = this.state.inputName;
    input[inputName] = "";

    this.setState({ input }, () => {
      this.keyboard.clearInput(inputName);
      console.log(
        "cleared",
        input,
        this.keyboard.options.inputName,
        this.keyboard.input,
        this.keyboard.getInput()
      );
    });
  };

  render() {
    let { input, keyboardOpen } = this.state;

    return (
      <div>
        <div className="inputsContainer">
          <input
            onFocus={() => this.setActiveInput("input1")}
            value={input["input1"] || ""}
            placeholder={"Input 1"}
            onChange={e => this.onChangeInput(e)}
          />
          <input
            onFocus={() => this.setActiveInput("input2")}
            value={input["input2"] || ""}
            placeholder={"Input 2"}
            onChange={e => this.onChangeInput(e)}
          />
          <input
            onFocus={() => this.setActiveInput("input3")}
            value={input["input3"] || ""}
            placeholder={"Input 3"}
            onChange={e => this.onChangeInput(e)}
          />
          <input
            onFocus={() => this.setActiveInput("input4")}
            value={input["input4"] || ""}
            placeholder={"Input 4"}
            onChange={e => this.onChangeInput(e)}
          />
          <input
            onFocus={() => this.setActiveInput("input5")}
            value={input["input5"] || ""}
            placeholder={"Input 5"}
            onChange={e => this.onChangeInput(e)}
          />
          <input
            onFocus={() => this.setActiveInput("input6")}
            value={input["input6"] || ""}
            placeholder={"Input 6"}
            onChange={e => this.onChangeInput(e)}
          />
        </div>
        <OutSideAlerter>
          <div className={`keyboardContainer ${!keyboardOpen ? "hidden" : ""}`}>
            <Keyboard
              keyboardRef={r => (this.keyboard = r)}
              inputName={this.state.inputName}
              layoutName={this.state.layoutName}
              onChangeAll={inputObj => this.onChangeAll(inputObj)}
              onKeyPress={button => this.onKeyPress(button)}
              layout={{
                ip: ["1 2 3", "4 5 6", "7 8 9", ". 0 {clear}", "{cancel} {enter}"]
              }}
              display={{
                "{clear}": "C",
                "{cancel}": "cancel",
                "{enter}": "enter"
              }}
            />
            <button className="submitBtn" onClick={this.submit}>
              Submit
            </button>
            <button className="closeBtn" onClick={this.closeKeyboard}>
              Close Keyboard
            </button>
          </div>
        </OutSideAlerter>
      </div>
    );
  }
}

export default App;
