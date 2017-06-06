import In from './in';
import Out from './out';
import Reservoir from './reservoir';
import Pipe from './pipe';
import Building from './building';

export default class BuildCursor extends PIXI.Container {

	constructor(world, interactionManager) {
		super();

		this.world = world;
		this.interactionManager = interactionManager;

		this.building = null;
		this.buildingPipe = false;

		world.interactive = true;

		world.mousemove = (e) => {
			if(this.building !== null) {
				if(this.buildingPipe === false) {
					this.building.x = e.data.global.x;
					this.building.y = e.data.global.y;
				}
			}
		}

		world.click = (e) => {

			if(this.buildingPipe !== false) {
				//Place pipe

				var hit = this.interactionManager.hitTest(e.data.global, this.world);
				if(hit instanceof Building) {
					if(this.buildingPipe.from === undefined || this.buildingPipe.from === hit) {
						this.buildingPipe.from = hit;
					} else {
						this.buildingPipe.to = hit;
						world.addChild(new Pipe(this.buildingPipe.from, this.buildingPipe.to));
						this.buildingPipe = false;
					}
				}

			} else if(this.building !== null) {
				//Place building

				this.removeChild(this.building);
				world.addChild(this.building);
				this.building.interactive = true;
				this.building = null;
			}
		}
	}

	newBuilding(type) {
		this.buildingPipe = false;
		if(this.building !== null) {
			this.removeChild(this.building);
		}
		this.building = null;

		switch(type) {
			case 'in':
				this.building = new In();
				this.addChild(this.building);
				break;
			case 'out':
				this.building = new Out();
				this.addChild(this.building);
				break;
			case 'reservoir':
				this.building = new Reservoir();
				this.addChild(this.building);
				break;
			case 'pipe':
			console.log("building pipe");
				this.buildingPipe = {
					from: undefined,
					to: undefined
				};
				break;
			default:
				throw new Error("Illegal building type");
		}
	}

}
