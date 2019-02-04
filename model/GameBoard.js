var Area = require("./Area");

class GameBoard {

	constructor () {

		this.id = { type: "gameboard", no: 0 };

		this.notify = () => {};
		this.whisper = () => {};
	}

	init (d1, d2) {

		this.data = {
			cards: []
		}

		this.areas = [
			new Area(0, d1, this),
			new Area(1, d2, this)
		];

		this.updates = [];
	}

	start (area) {

		this.notify("start", this.id);
		area = area || this.areas[Math.floor(Math.random()*2)];
		this.currentArea = area;
		this.currentArea.draw (4);
		this.currentArea.opposite.draw (5);
		//otherArea.duellist.manapool.NewGem();
		this.currentArea.newTurn ();
		//console.log(this.currentArea.hand.cards);
	}

	get tiles() {

		return this.areas[0].field.tiles.concat(this.areas[1].field.tiles);
	}

	newTurn () {

		this.currentArea = this.currentArea.opposite;
		this.currentArea.newTurn();
	}

	command (cmd, player) {

		var p = this.areas[player];

		switch (cmd.type) {
		case "play": {
			let card = this.data.cards[cmd.id.no],
				targets = cmd.targets ? cmd.targets.map(id => this.tiles.find(t => t.id.no === id.no)) : undefined;
			if (card.canBePlayedOn(targets))
				card.play(targets);
			break; }
		case "attack": {
			let card = this.data.cards[cmd.id.no],
				target = this.data.cards[cmd.target.no];
			if (card.canAttack(target))
				card.attack(target);
			break; }
		case "move": {
			let card = this.data.cards[cmd.id.no],
				tile = this.tiles.find(t => t.id.no === cmd.to.no);
			if (card.canMoveOn(tile))
				card.move(tile);
			break; }
		case "faculty": {
			let card = this.data.cards[cmd.id.no];
			if (card.faculties && card.faculties.length > cmd.faculty && card.canUse(card.faculties[cmd.faculty]))
				card.faculties[cmd.faculty].execute(this, card);
			break; }
		case "endturn":
			if (p.isPlaying)
				this.newTurn();
			break;
		default: break;
		}
	}

	registerCard (card) {

		this.data.cards.push(card);
		return this.data.cards.length-1;
	}

	update () {

		while (this.updates.length > 0)
			this.updates[0].trigger();
	}
}

module.exports = GameBoard;