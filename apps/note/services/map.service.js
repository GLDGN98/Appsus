// Var that is used throughout this Module (not global)
var gMaps = []

import { noteService } from "./note.service.js"

export const mapService = {
    addMap,
    resetMaps,
    addMarker

}
const googleEnabled = _connectGoogleApi().then(() => true).catch(() => false)

function addMap(note, elMap, lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    if (googleEnabled) {
        console.log('google available')

        let map = new google.maps.Map(
            elMap, {
            center: { lat, lng },
            zoom: 15
        })
        console.log('Map!', map)
        map.addListener("click", (mapsMouseEvent) => {
            var latlng = { lat: mapsMouseEvent.latLng.lat(), lng: mapsMouseEvent.latLng.lng() }
            note.info.lat = latlng.lat
            note.info.lng = latlng.lng
            console.log(note.info)
            addMarker(map, latlng)
        })
        var marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            title: 'Saved position'
        })
        gMaps.push({ map, marker })
        return new Promise.resolve()
    }
    return new Promise.reject()
}

function resetMaps() {
    gMaps = []
}


function addMarker(map, loc) {
    console.dir(map)
    var marker = new google.maps.Marker({
        position: loc,
        map: mapsMouseEvent.target,
        title: 'Saved position'
    })
    return marker
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = ''
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}
