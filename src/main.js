import Utils from './scripts/utils';
import Parser from './scripts/parser';
import terminalPrinter from "./scripts/terminal-printer";

const CommandParser = new Parser();
const _Body = document.getElementById('body');
const _TerminalDiv = document.getElementById('terminal');
let Terminal;

Utils.DomReady(e => {
  console.log('Init terminal');
  Terminal = new terminalPrinter(_TerminalDiv);
  Terminal.print("Hello, welcome to my site. Type help to see a list of available commands.");
  addNewLine();

});

const cleanupOldLine = (oldInputElement) => {
  oldInputElement.removeEventListener("blur", inputBlurHandler);
  oldInputElement.removeEventListener("keypress", inputKeypressHandler);
}

const addNewLine = (previousCommand = "") => {
  let newLine = document.createElement('div');
  let newInput = document.createElement('input');
  let newLineSignifier = document.createElement('span');

  newInput.className += "terminal-input";
  newLineSignifier.innerHTML = "$";

  newLine.appendChild(newLineSignifier);
  newLine.appendChild(newInput);

  console.log(newInput);
  _TerminalDiv.appendChild(newLine);

  newInput.focus();
  newInput.addEventListener("keypress", inputKeypressHandler);
  newInput.addEventListener("blur", inputBlurHandler);
};

const inputBlurHandler = (e) => {
  e.target.focus();
};

const inputKeypressHandler = (e) => {
  if(e.key === "Enter") {
    console.log(e.target.value);
    const enteredCommand = e.target.value;
    if(enteredCommand !== "") {
      //Determine what the command was
      let CO = CommandParser.parseCommand(enteredCommand);

      Terminal.print(CO);
      //Cleanup Old line
      cleanupOldLine(e.target);
      //Add new line to accept input
      addNewLine(enteredCommand);
    }
  }
};
