

const { useState, useEffect, useRef } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

export function Map({ lat, lng }) {
    const ref = useRef(null)
    const [map, setMap] = useState()
    const [marker, setMarker] = useState()

    useEffect(() => {
        if (ref.current && !map) setMap(new window.google.maps.Map(ref.current, { center: { lat, lng }, zoom: 15 }))
    }, [ref, map])

    return  
}

export function Marker({options}) {
    const [marker, setMarker] = useState()

    useEffect(() => {
      if (!marker) setMarker(new google.maps.Marker())
  
      // remove marker from map on unmount
      return () => {
        if (marker) marker.setMap(null);
      }
    }, [marker])


   useEffect(() => {
      if (marker) marker.setOptions(options)
    }, [marker, options])

  }