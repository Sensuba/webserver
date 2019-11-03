var Bloc = require('./Bloc');
var Types = require('./Types');

class StoreCard extends Bloc {

	constructor (src, ctx) {

		super("writecardvar", src, ctx, true);
		this.f = (src, ins) => {
			(ins[2] || src).setVariable(ins[0], ins[1]);
			return [];
		};
		this.types = [Types.string, Types.card, Types.card];
	}
}

module.exports = StoreCard;