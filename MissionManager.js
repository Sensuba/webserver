var Manager = require("./Manager");
var CreditManager = require("./CreditManager");
var DeckAnalyst = require("./DeckAnalyst");
var Script = require("./mission/Script");
var ScriptedAI = require("./ai/ScriptedAI");

class MissionManager extends Manager {

	constructor (mission) {

		super("mission");
		this.mission = mission;
	}

	init (socket, name, avatar) {

		this.socket = socket;
		this.script = new Script(this.mission);
		this.ai = new ScriptedAI(this.game, 1);

		this.game.send = (type, src, data) => {
			socket.emit("notification", {type, src, data});
			if (type === "newturn" && src.no === 1)
				this.callAI();
		}
		this.game.whisper = (type, no, src, ...data) => no === 0 ? socket.emit("notification", {type, src, data}) : {};
		
		try {
			this.game.init(
				{ name, avatar, socket, deck: this.script.data.player.deck, props: this.script.data.player.props },
				{ name: this.script.data.ai.name, deck: this.script.data.ai.deck, props: this.script.data.ai.props }
			);
			this.game.start(this.game.areas[this.script.data.first]);
		} catch (e) {
			console.log(e);
			socket.emit("endgame", {state: 6, credit: 0}); // State 6 : internal error
			console.log("Mission ended by internal error");
		}

		console.log((name || "Anonymous") + " started mission " + this.mission);
	}

	callAI () {

		setTimeout(() => {
			if (this.game.currentArea.id.no === 0)
				return;
			this.game.command(this.ai.act(), 1);
			if (this.game.currentArea.id.no === 1)
				this.callAI();
		}, 500);
	}

	command (socket, cmd) {

		try {
			this.game.command(cmd, 0);
		} catch (e) {
			console.log(e);
			this.finish();
			this.socket.emit("endgame", {state: 6, credit: 0}); // State 6 : internal error
			console.log("Mission ended by internal error");
		}
	}

	kick () {

		this.finish();
		console.log("Mission ended by connection lost");
	}
}

module.exports = MissionManager;