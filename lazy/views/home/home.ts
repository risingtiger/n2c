


import type { $NT, ViewContextT } from "../../../../n2client/defs.js"

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
	cars: CarT[]
}

type StateT = {
	propstate: string
	overlay_open: boolean
}


const ATTRIBUTES:AttributesT = { propa:"" }



class VHome extends HTMLElement {

	a:AttributesT = { ...ATTRIBUTES }
	m:ModelT =      { cars: [] }
	s:StateT = {
		propstate:"",
		overlay_open: false
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
		const cars = this.context!.loadeddata.cars as CarT[]
		this.m.cars = [...cars].sort(() => Math.random() - 0.5).slice(0, 3)

		const header = document.querySelector('c-header[appheader]') as any;
		header.SetLeftIcon('x')
		header.SetTitle('Home')
		header.SetRightActionIcons(['add','check','list'])
	}




	render() {
		render(this.template(this.s, this.m), this.shadow);

	}

	open_overlay() {
		this.s.overlay_open = true
		this.render()
	}

	close_overlay() {
		this.s.overlay_open = false
		this.render()
	}

	carRow = (car:CarT) => html`
		<li @click=${() => $N.SwitchStation.GoTo(`car/${car.id}`)}>
			<span class="label">${car.make} ${car.model}</span>
			<span class="actions">
				<span class="action"><i class="icon-arrowright1"></i></span>
			</span>
		</li>
	`;





	template = (_s:any, _m:any) => { return html`{--css--}{--html--}`; };
}




customElements.define('v-home', VHome);


export {  }






