


import type { $NT, ViewContextT } from "../../../../n2client/defs.js"
import "./parts/details/details.js"

declare var render: any;
declare var html: any;
declare var $N: $NT;
type AttributesT = {
    propa: string,
}

type CarT = {
	id: string
	make: string
	model: string
	year: number
	color: string
}

type ModelT = {
	car: CarT
	cars: CarT[]
}

type StateT = {
	propstate: string
}


const ATTRIBUTES:AttributesT = { propa:"" }



class VCar extends HTMLElement {

	a:AttributesT = { ...ATTRIBUTES }
	m:ModelT =      { car: { id: "", make: "", model: "", year: 0, color: "" }, cars: [] }
	s:StateT = {
		propstate:""
	}

	shadow:ShadowRoot
	context?:ViewContextT


	static get observedAttributes() { return Object.keys(ATTRIBUTES); }




	constructor() {   
		super(); 
		this.shadow = this.attachShadow( { mode: 'open' } );
	}




	async connectedCallback() {}




	async attributeChangedCallback(_name:string, _oldval:string|boolean|number, _newval:string|boolean|number) {
	}




	disconnectedCallback() {}




	ingest() {
		this.m.cars = this.context!.loadeddata.cars as CarT[]
		this.m.car = this.m.cars.find((car) => car.id === this.context!.pathparams.id)!

		const header = document.querySelector('c-header[appheader]') as any;
		header.SetLeftIcon('x')
		header.SetTitle('Cars')
		header.SetRightActionIcons(['add','check','list'])
	}




	render() {
		render(this.template(this.s, this.m), this.shadow);
	}





	selectCar = (car:CarT) => {
		this.m.car = car
		this.render()
	}

	carRow = (car:CarT) => html`
		<li @click=${() => this.selectCar(car)}>
			<span class="label"><span>${car.make} ${car.model}</span><small>${car.color}</small></span>
			<span class="actions">
				<span class="action"><i class="icon-arrowright1"></i></span>
			</span>
		</li>
	`;

	template = (_s:any, _m:any) => { return html`{--css--}{--html--}`; };
}




customElements.define('v-car', VCar);


export {  }






