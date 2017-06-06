import Structure from './Structure';
import Building from './Building';

export default class Pipe extends Structure {

	constructor(from, to) {
		super();

		if(!from instanceof Building || !to instanceof Building) {
      throw new Error("Wrong structure type, pipes can connect only buildings.");
    }

		this.from = from;
    from.pipes.push(this);
		this.to = to;
		to.pipes.push(this);

		this.waterSpeed = 0;

		this.graphics = new PIXI.Graphics();
		this.redraw();
		this.addChild(this.graphics);
	}

	getOther(building) {
		if(this.from === building) {
			return [this.to, 1];
		}
		if(this.to ===	 building) {
			return [this.from, -1];
		}
		throw new Error("Illegal building provided");
	}

	getCapacity() {
		return this.level;
	}

	redraw() {
		this.graphics.clear();

		if(this.waterSpeed > 0) {
			let color = 0x010000 * Math.floor(255 * (Math.abs(this.waterSpeed) / this.getCapacity()));
			this.graphics.lineStyle(2, color).moveTo(this.from.x, this.from.y).lineTo(this.to.x, this.to.y);
		} else {
			let color = 0x000001 * Math.floor(255 * (Math.abs(this.waterSpeed) / this.getCapacity()));
			this.graphics.lineStyle(2, color).moveTo(this.from.x, this.from.y).lineTo(this.to.x, this.to.y);
		}
	}

}