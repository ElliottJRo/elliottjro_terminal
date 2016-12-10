import cmdObjTemplate from "./command-object";

const commandsList = "<span class='cmd-list'>list clear check cd view</span>";

const translateCommand = (cmd) => {
  let CO = Object.assign({}, cmdObjTemplate);
  switch(cmd) {

    case "help":
      console.debug(`Parser::translateCommand() - help command found`);
      CO.textCommand = `Here is a list of commands:<br/>${commandsList}`;
      CO.commandId = 0;
      return CO;
    break;

    default:
      CO.textCommand = `Command '${cmd}' was not found.<br>
        Here is a list of commands:<br/>
        ${commandsList}`;
      CO.commandId = 0;
      return CO;

    break;
  }
}

class Parser {

  constructor() {

  }

  parseCommand(command) {
    console.debug(`Parser::parseCommand - entered comand: ${command}`);
    let CO = translateCommand(command);
    console.debug(`Parser::parserCommand - commandObject:`, CO);
    return CO;
  }

}

export default Parser;
