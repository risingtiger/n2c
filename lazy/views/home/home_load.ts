

import { $NT } from "../../../../n2client/defs.js"

declare var $N: $NT;


type LoadReturnT = {
	cars:any[]
}
export const load = (_pathparams:any, _searchparams:any) => new Promise(async (res, rej) => {

	const promises:any[] = []

	promises.push($N.FetchLassie(`/api/dummydata/cars/`, { method: "GET" }));

	const results = await Promise.all(promises)

	if (!results[0].ok) {   rej(); return;   }

	const returnobj:LoadReturnT = { cars:results[0].data}
	// d.set(`cars/${pathparams.id}`, ( results[0].data as any[] )) 
	// res({ d, refreshon:["cars/"+pathparams.id]})	

	res(returnobj)
})




type PostLoadReturnT = {
	cars:any[],
	specificcar: any
}
export const post_load = (pathparams:any, searchparams:any) => new Promise(async (res, rej) => {
	const promises:any[] = []

	promises.push($N.FetchLassie(`/api/dummydata/cars/`, { method: "GET" }));
	promises.push($N.FetchLassie(`/api/dummydata/cars/${pathparams.id}?props=${searchparams.color}`, { method: "GET" }));

	const results = await Promise.all(promises)

	if (!results[0].ok || !results[1].ok) {   rej(); return;   }

	const returnobj:PostLoadReturnT = { cars: results[0].data, specificcar: results[1].data}
	// d.set(`cars`, ( results[0].data as any[] ))
	// res({ d, refreshon:["cars"]});

	res(returnobj)
})




