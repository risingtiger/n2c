//import { $NT } from "../../../../../defs_client_symlink.js"

declare var render: any;
declare var html: any;
// declare var $N: $NT;

type AttributesT = {
	mode: "prop",
}
type ModelT = {
	prop: "",
}
type StateT = {
	prop: "ya",
}

const ATTRIBUTES:AttributesT = {
	mode: "prop",
}

class VPPlaceholder extends HTMLElement {
	a:AttributesT = { ...ATTRIBUTES }
	m:ModelT = {
		prop:"",
	}
	s:StateT = {
		prop: "ya",
	}
	shadow:ShadowRoot

	static get observedAttributes() { return Object.keys(ATTRIBUTES) }

	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: "open" })
	}

	connectedCallback() {
	}

	attributeChangedCallback(_name:string, _oldval:string|boolean|number, _newval:string|boolean|number) {
	}

	disconnectedCallback() {
	}


	render(state_changes:Partial<StateT> = {}) {
		this.s = Object.assign(this.s, state_changes)
		render(this.template(this.s, this.m, this.a), this.shadow)
	}

	template = (_s:StateT, _m:ModelT, _a:AttributesT) => html`{--css--}{--html--}`
}

customElements.define("vp-homeplaceholder", VPPlaceholder)

export { }
