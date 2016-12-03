import Utils from './scripts/utils';

Utils.DomReady(e => {
  console.log('Init terminal');
  addNewLine();

});

let cleanupOldLine = (oldInputElement) => {
  oldInputElement.removeEventListener("blur", inputBlurHandler);
  oldInputElement.removeEventListener("keypress", inputKeypressHandler);
}

let addNewLine = (previousCommand = "") => {
  let newLine = document.createElement('div');
  let newInput = document.createElement('input');
  let newLineSignifier = document.createElement('span');

  newInput.className += "terminal-input";
  newLineSignifier.innerHTML = "$";

  newLine.appendChild(newLineSignifier);
  newLine.appendChild(newInput);

  console.log(newInput);
  document.getElementById('body').appendChild(newLine);

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

      //Display command results

      //Cleanup Old line
      cleanupOldLine(e.target);
      //Add new line to accept input
      addNewLine(enteredCommand);
    }
  }
};
