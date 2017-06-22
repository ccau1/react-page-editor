/* @flow */
import MapView from './MapView';
import MapEditor from './MapEditor';
import MapControl from './MapControl';

export default {
  name: 'Map',
  defaultVal: {
    center: {
      lat: 22.288494,
      lng: 114.145073
    },
    zoom: 14,
    markers: [
      {
        display: 'You are here!',
        lat: 22.288494,
        lng: 114.145073
      }
    ],height:300
  },
  editor: MapEditor,
  control: MapControl,
  view: MapView
};
