/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getElements} from './plugins';
import {Button} from '../layoutElements';

export default class ElementSelect extends Component {
  static propTypes = {
    onElementSelect: PropTypes.func.isRequired
  };

  render() {
    const {onElementSelect} = this.props;
    const elements = getElements();
    console.log('elements', elements);
    return (
      <div>
        {Object.keys(elements).map(name => {
          return (
            <Button.Link
              key={name}
              onClick={onElementSelect.bind(this, name)}
              label={elements[name].name}
            />
          );
        })}
      </div>
    );
  }
}
