import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function MapContainer(props) {
  const { google, address } = props;
  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{ lat: address.latitude, lng: address.longitude }}
    >
      <Marker position={{ lat: address.latitude, lng: address.longitude }} />
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_MAPS_API_KEY_HERE",
})(MapContainer);
