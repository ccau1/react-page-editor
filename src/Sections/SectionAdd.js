/* @flow */

import React, {Component} from 'react';
import uuid from '../helpers/uuid';
import Button from '../layoutElements/Button';

export default class SectionAdd extends Component {
  static propTypes = {

  };

  onAddClick() {
    const {onAdd} = this.props;
    onAdd({
      identifier: uuid(),
      createdAt: new Date().getTime(),
      lastModified: new Date().getTime(),
      _element: null
    });
  }

  render() {
    const {onAddClick} = this;
    return (
      <div>
        <Button.Primary onClick={onAddClick.bind(this)} label={'Add Section'} fullWidth={true} />
      </div>
    );
  }
}
