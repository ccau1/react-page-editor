/* @flow */

import React, {Component} from 'react';
import {NonNullTextField as TextField} from '../../../layoutElements/TextField';
export default class VideoEditor extends Component {
  static propTypes = {};

  onUrlChange(newValue,ev): void {
    const {model, onChange} = this.props;
    const value = newValue;
    let val = model.val;
    val.url = value;
    onChange(model);
  }

  render() {
    const {model} = this.props;
    const {val} = model;
    return (
      <div>
        <TextField
          fullWidth={true}
          value={val.url}
          onChange={this.onUrlChange.bind(this)}
          floatingLabelText="VIDEO URL"
        />

      </div>
    );
  }
}
