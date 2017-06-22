/* @flow */

import React, {Component} from 'react';
import {TextField} from '../../../layoutElements';

export default class ImageEditor extends Component {
  static propTypes = {

  };

  onUrlChange(ev: Object): void {
    const {model, onChange} = this.props;
    const value = ev.target.value;
    let val = model.val;
    val.url = value;
    onChange(model);
  }

  render() {
    const {model: {val}} = this.props;
    return (
      <div>
        <TextField fullWidth={true} value={val.url} onChange={this.onUrlChange.bind(this)} floatingLabelText="Image URL" />
      </div>
    );
  }
}
