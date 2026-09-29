import type { $NT, ViewContextT } from "../../../../../../n2client/defs.js"

declare var render: any
declare var html: any
declare var $N: $NT

type CarT = {
	id: string
	make: string
	model: string
	year: number
	color: string
}

class VPCarDetails extends HTMLElement {
	shadow:ShadowRoot
	m: { car:CarT, props:string } = {
		car: { id: "", make: "", model: "", year: 0, color: "" },
		props: "",
	}
	private _context?:ViewContextT

	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: "open" })
	}

	set context(context:ViewContextT) {
		// check ensures we don't needlessly reupdate on every single rerender, only if the actual data has changed
		if (this._context === context) return
		this._context = context
		$N.SwitchStation.UpdateViewPart(this)
	}

	get context():ViewContextT {
		return this._context!
	}

	ingest() {
		this.m.car = (this.context.loadeddata.car as CarT[])[0]
		this.m.props = this.context.searchparams.props || ""
	}

	render() {
		render(this.template(this.m), this.shadow)
	}

	template = (_m:typeof this.m) => html`{--css--}{--html--}`
}

customElements.define("vp-car-details", VPCarDetails)

export { }
