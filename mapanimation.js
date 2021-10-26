mapboxgl.accessToken = 'your_access_token';
let markers = [];
let colors = ['', '#000000', '#5B618A', '#9EADC8', '#B9E28C', '#D6D84F', '#02394A', '#043565', '#5158BB', '#F26DF9', '#EB4B98',
				'#48ACF0', '#594236', '#6F584B', '#93A3BC', '#CCDDE2', '#D4CBE5', '#CFC7D2', '#BEA8AA', '#9E9885', '#7C7F65',
				'#E0BAD7', '#61D095', '#48BF84', '#439775', '#2A4747', '#FFBE0B', '#FB5607', '#FF006E', '#8338EC', '#3A86FF'];
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.091542, 42.358862],
    zoom: 12
});
async function run(){
	// get bus data
	let busObjects = [];
	for (let route = 1; route <= 30; route++) {  
		let buses = await getBuses(route);
		if (buses.length > 0) {
			let busObject = {
				route: route,
				buses: await getBuses(route),
				color: colors[route]
			}
			busObjects.push(busObject);
		}
	}

	// clear markers
	if (markers.length > 0) {
		markers.forEach((marker) => marker.remove());
	}

	// set markers
	busObjects.forEach((busObject) => {
		busObject.buses.forEach((bus) => {
			let marker = new mapboxgl.Marker({color: busObject.color})
				.setLngLat([bus.attributes.longitude, bus.attributes.latitude])
				.addTo(map);
			markers.push(marker);
		})
	})
		
	// timer
	setTimeout(run, 15000);
}
// Request bus data from MBTA
async function getBuses(route, apiKey){
	const url = `https://api-v3.mbta.com/vehicles?filter[route]=${route}&include=trip&api_key=your_api_key`;
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
run();