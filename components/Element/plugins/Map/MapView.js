import React, {Component} from 'react';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/assets/img/leaflet/marker-icon-2x.png',
  iconUrl: '/assets/img/leaflet/marker-icon.png',
  shadowUrl: '/assets/img/leaflet/marker-shadow.png'
});

export const SimpleMapView = props =>
  <Map center={props.center} zoom={props.zoom}>
    <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
    {props.markers.map((marker, index) => {
      const position = [];
      let display = '';
      ({lat: position[0] = 0, lng: position[1] = 0, display} = marker);
      return (
        <Marker key={index + ' Marker'} position={position}>
          {display &&
            <Popup>
              <span>{display}</span>
            </Popup>}
        </Marker>
      );
    })}
  </Map>;
export default class MapView extends Component {
  static propTypes = {};

  render() {
    const {model: {val}} = this.props;
    if (!val) {
      return (
        <div>
          <h2>Please set up the map config!</h2>
        </div>
      );
    }
    const {height} = val;

    return (
      <div style={{height}}>
        <SimpleMapView {...val} />
      </div>
    );
  }
}
