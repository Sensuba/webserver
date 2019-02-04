var targets = require('../Event').targets;

class Types {

	static string (value, src) {

		return value;
	}

	static int (value, src) {

		return typeof value === 'string' ? parseInt(value, 10) : value;
	}

	static bool (value, src) {

		return (typeof value === 'string' ? (value === "true" ? true : false) : value) || false;
	}

	static area (value, src) {

		return typeof value === 'string' ? (value === "self" ? src.area : src.area.opposite) : value;
	}

	static location (value, src) {

		if (!(typeof value === 'string'))
			return value;
		switch (value) {
		case 'this': return src.location;
		case 'hand': return src.area.hand;
		case 'deck': return src.area.deck;
		case 'cemetery': return src.location;
		case 'opponent\'s hand': return src.area.opposite.hand;
		case 'opponent\'s deck': return src.area.opposite.deck;
		case 'opponent\'s cemetery': return src.location;
		default: src.location;
		}
	}

	static locations (value, src) {
		
		if (!(typeof value === 'string'))
			return value;
		switch (value) {
		case 'board': return src.area.gameboard.tiles;
		case 'field': return src.area.field.tiles;
		case 'front': return src.area.field.front;
		case 'back': return src.area.field.back;
		case 'hand': return src.area.hand;
		case 'deck': return src.area.deck;
		case 'cemetery': return src.location;
		case 'opponent\'s field': return src.area.opposite.field.tiles;
		case 'opponent\'s front': return src.area.opposite.field.front;
		case 'opponent\'s back': return src.area.opposite.field.back;
		case 'opponent\'s hand': return src.area.opposite.hand;
		case 'opponent\'s deck': return src.area.opposite.deck;
		case 'opponent\'s cemetery': return src.location;
		default: src.location;
		}
	}

	static card (value, src) {

		if (!(typeof value === 'string'))
			return value;
		switch (value) {
		case 'this': return src;
		case 'your hero': return src.area.hero;
		case 'opponent\'s hero': return src.area.opposite.hero;
		default: return src;
		}
	}

	static model (value, src) {

		return typeof value === 'string' ? src.loadModel() : value;
	}

	static cardfilter (value, src) {

		if (!(typeof value === 'string'))
			return value;
		switch (value) {
		case 'hero':
		case 'figure':
		case 'character':
		case 'entity':
		case 'spell':
		case 'artifact':
			return target => target.isType(value);
		case 'damaged': return target => target.damaged;
		default: target => true;
		}
	}

	static tilefilter (value, src) {

		if (!(typeof value === 'string'))
			return value;
		switch (value) {
		case 'empty': return targets.empty;
		case 'entity': return targets.entity;
		case 'character': return targets.character;
		case 'hero': return targets.hero;
		case 'figure': return targets.figure;
		case 'artifact': return targets.artifact;
		case 'friendly': return targets.friendly;
		case 'friendly empty': return targets.friendlyEmpty;
		case 'friendly entity': return targets.friendlyEntity;
		case 'friendly character': return targets.friendlyCharacter;
		case 'friendly figure': return targets.friendlyFigure;
		case 'enemy': return targets.enemy;
		case 'enemy empty': return targets.enemyEmpty;
		case 'enemy entity': return targets.enemyEntity;
		case 'enemy character': return targets.enemyCharacter;
		case 'enemy figure': return targets.enemyFigure;
		default: return targets.tile;
		}
	}
}

module.exports = Types;