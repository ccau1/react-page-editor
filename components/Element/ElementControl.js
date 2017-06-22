/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from '../layoutElements';

export default class ElementControl extends Component {
  static propTypes = {
    model: PropTypes.shape({}).isRequired,
    onRemove: PropTypes.func.isRequired
  };

  render() {
    const {model, onRemove, elementControls} = this.props;

    return (
      <div>
        <Button.Link onClick={onRemove.bind(this, model)} label={'Remove Element'} />
        {elementControls}
      </div>
    );
  }
}
