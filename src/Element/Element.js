/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getElements} from './plugins';
import ElementControl from './ElementControl';
import styled from 'styled-components';

const ElementContainer = styled.div`
  padding: ${props => !props.editMode ? '0px' : '5px'}
`;

export default class Element extends Component {
  static propTypes = {
    model: PropTypes.shape({}).isRequired,
    settings: PropTypes.shape({}),
    editMode: PropTypes.bool,
    onRemove: PropTypes.func.isRequired
  };

  getElementComponent(element: Object, settings: Object, editMode: boolean) {
    const {onChange} = this.props;

    const ElementMapper = getElements();

    if (!ElementMapper[element.type]) {
      return <div>No element found for this type</div>;
    }

    return React.createElement(
      editMode
        ? ElementMapper[element.type].editor
        : ElementMapper[element.type].view,
      {
        model: element,
        settings,
        onChange,
        editMode
      }
    );
  }

  getElementControl() {
    const {model, settings, onChange} = this.props;

    const ElementMapper = getElements();

    if (!ElementMapper[model.type]) {
      return null;
    }

    const ControlComponent = ElementMapper[model.type].control;
    return (
      <ControlComponent model={model} settings={settings} onChange={onChange} />
    );
  }

  render() {
    const {model, editMode, onRemove, settings} = this.props;

    return (
      <ElementContainer editMode={editMode} className={'rpe-element'}>
        {editMode &&
          <ElementControl
            elementControls={this.getElementControl()}
            model={model}
            settings={settings}
            onRemove={onRemove.bind(this)}
          />}
        {this.getElementComponent(model, settings, editMode)}
      </ElementContainer>
    );
  }
}
