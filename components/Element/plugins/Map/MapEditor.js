/* @flow */

import React, {Component} from 'react';
import {Button, NonNullTextField as TextField} from '../../../layoutElements';

export default class MapEditor extends Component {
  static propTypes = {};

  constructor(props: Object) {
    super(props);
  }
  handleChange = (model: Object) => {
    const {onChange} = this.props;
    onChange(model);
  };
  addMarker(): void {
    const {model} = this.props;
    model.val.markers.push({lat: 0, lng: 0});
    this.props.onChange(model);
  }

  removeMarker(index: number): void {
    const {model} = this.props;
    model.val.markers.splice(index, 1);
    this.props.onChange(model);
  }

  onMarkerChange(index: number, field: string,newValue:string): void {
    let {model} = this.props;
    const value = parseFloat(newValue);
    model.val.markers[index][field] = value;
    this.handleChange(model);
  }

  onMarkerDisplayChange(index: number, newValue:string): void {
    let {model} = this.props;
    model.val.markers[index].display = newValue;
    this.handleChange(model);
  }

  onCenterChange = (p: string) => (newValue:string): void => {
    let {model} = this.props;
    const value = parseFloat(newValue);
    model.val.center[p] = value;
    this.handleChange(model);
  };

  onHeightChange = (p: string) => (newValue:string): void => {
    let {model} = this.props;
    const height = parseFloat(newValue);
    model.val.height = height;
    this.handleChange(model);
  };

  render() {
    const {model: {val}} = this.props;
    return (
      <div>

        <TextField
          value={val.height}
          type="number"
          floatingLabelText="Map Height"
          onChange={this.onHeightChange('height')}
        />

        <TextField
          value={val.center.lat}
          type="number"
          floatingLabelText="Center Lat"
          onChange={this.onCenterChange('lat')}
        />
        <TextField
          value={val.center.lng}
          type="number"
          floatingLabelText="Center Lng"
          onChange={this.onCenterChange('lng')}
        />
        <TextField value={val.zoom} floatingLabelText="Zoom" />
        <br />
        <Button.Link onTouchTap={this.addMarker.bind(this)}>
          Add Marker
        </Button.Link>
        {val.markers.map((marker, markerIndex) => {
          return (
            <div key={markerIndex}>
              <TextField
                type="number"
                value={marker.lat}
                floatingLabelText="Marker Lat"
                onChange={this.onMarkerChange.bind(this, markerIndex, 'lat')}
              />
              <TextField
                type="number"
                value={marker.lng}
                floatingLabelText="Marker Lng"
                onChange={this.onMarkerChange.bind(this, markerIndex, 'lng')}
              />
              <TextField
                value={marker.display}
                floatingLabelText="Display"
                onChange={this.onMarkerDisplayChange.bind(this, markerIndex)}
              />
              <Button.Link
                onTouchTap={this.removeMarker.bind(this, markerIndex)}
              >
                Remove
              </Button.Link>
            </div>
          );
        })}
      </div>
    );
  }
}
