/* @flow */

import React, {Component} from 'react';
import {Button, NonNullTextField} from '../../../layoutElements';
import debounce from 'lodash/debounce';

export default class RowLayoutControl extends Component {
  static propTypes = {};

  state: {
    split: number
  };

  constructor(props: Object): void {
    super(props);
    this.state = {
      split: props.model.val.split
    };
    this.update = debounce(this.update, 500);
  }

  update = () => {
    const {onChange, model} = this.props;
    let newModel = {...model, val: {...model.val, split: this.state.split}};
    onChange(newModel);
  };

  onSplitChange(ev: Object) {
    const newSplit = ev.target.value;
    if (!isNaN(newSplit)) {
      this.setState(prev => {
        if (newSplit > 0) {
          this.update();
        }
        return {split: newSplit};
      });
    }
  }

  render() {
    const {model: {val}} = this.props;
    // const {split} = this.state;
    return (
      <div>
        <NonNullTextField
          type="number"
          value={this.state.split}
          floatingLabelText="Split Number"
          onChange={this.onSplitChange.bind(this)}
        />
      </div>
    );
  }
}
