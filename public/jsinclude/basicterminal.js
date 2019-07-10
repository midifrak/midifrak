export class TextAreaTerminal {
    constructor(childName, blink) {
        this.commands = [];
        try {
            this.child = document.getElementById(childName);
            this.init(blink);
            console.log("Terminal init");
        }
        catch (error) {
            console.log(error);
        }
    }
    registerShim(set, toThis) {
        set.commands.push(toThis);
        set.writeln(toThis.looksFor + " Loaded");
        console.log("Successfully loaded command of name:" + toThis.looksFor);
    }
    blink() {
        //console.log("blink");
    }
    init(blink) {
        this.child.style.color = "green";
        window.setInterval(() => this.blink(), 1000);
        if (blink)
            this.child.addEventListener("keypress", this.rootRunner.bind(this));
        this.child.value = ">";
    }
    writeln(output) {
        this.child.value += ("\r\n>" + output + "\r\n>");
        this.child.scrollTop = this.child.scrollHeight;
    }
    commandDispatch(cmd, args) {
        console.log("Command is: " + cmd);
        let matchCommand = this.commands.find(x => x.looksFor === cmd);
        let result = matchCommand.proc(...args);
        return result;
    }
    rootRunner(ev) {
        if (ev.keyCode !== 13) {
            return;
        }
        ev.preventDefault();
        let lines = this.child.value;
        let lastLine = lines.substr(lines.lastIndexOf("\n") + 1);
        let penWords = lastLine.split(" ");
        let pen = penWords[0];
        let commandStr = pen.substring(1, pen.length);
        let commandOutput;
        try {
            let commandOutput = this.commandDispatch(commandStr, penWords.slice(0, penWords.length));
            this.writeln(commandOutput);
        }
        catch (e) {
            let jsCommand = lastLine.split(">")[1];
            console.log(jsCommand);
            let result = eval(jsCommand);
            console.log(result);
            let output = "Invalid command";
            output += " but JS evaluated to: " + result;
            this.writeln(output);
            console.log(e);
        }
    }
    ;
}
//# sourceMappingURL=basicterminal.js.map