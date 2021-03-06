var Bloc = require('./Bloc');
var Types = require('./Types');

class FilterEffect extends Bloc {

	constructor (src, ctx) {

		super("filtereffect", src, ctx);
		this.f = (src, ins) => [target => target && target.innereffects.some(e => ins[0](e)), model => model.blueprint.basis.some(basis => ins[0](model.blueprint[basis.type][basis.index]))];
		this.types = [Types.effecttype];
	}
}

module.exports = FilterEffect;