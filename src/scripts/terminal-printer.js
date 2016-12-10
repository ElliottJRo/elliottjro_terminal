class TerminalPrinter {

  constructor(bodyDiv) {
    this.base = bodyDiv;

  }

  print(text = 'this is default text', newLine = false, margin = 0) {
    let lineText = document.createElement('div');
    lineText.className += 'line-text';

    if(typeof(text) === "string") {
      lineText.innerHTML = text;
    } else if(typeof(text) === "object") {
      lineText.innerHTML = text.textCommand;
    }

    this.base.appendChild(lineText);

  }

}

export default TerminalPrinter;
