

import { $NT } from "../../../../n2client/defs.js"

declare var $N: $NT;


export const load = (_pathparams:any, _searchparams:any) => Promise.resolve({})




type PostLoadReturnT = {
	cars:any[]
}
export const post_load = (_pathparams:any, searchparams:any) => new Promise(async (res, rej) => {
	const listresult = await $N.FetchLassie(`/api/dummydata/cars/`, { method: "GET" })

	if (!listresult.ok) { rej(); return }

	const cars = listresult.data as any[]
	const detailresults = await Promise.all(cars.map((car) =>
		$N.FetchLassie(`/api/dummydata/cars/${car.id}?props=${searchparams.props || ""}`, { method: "GET" })
	))

	if (detailresults.some((result) => !result.ok)) { rej(); return }

	const allcars = cars.map((car, index) => {
		const details = detailresults[index].data
		return { ...car, ...(Array.isArray(details) ? details[0] : details) }
	})

	const returnobj:PostLoadReturnT = { cars: allcars }
	res(returnobj)
})
