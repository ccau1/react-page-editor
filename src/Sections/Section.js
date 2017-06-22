/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getElements} from '../Element/plugins';
import SectionControl from './SectionControl';
import Element from '../Element';
import ElementSelect from '../Element/ElementSelect';
import StyleContainer from '../helpers/StyleContainer';

class Section extends Component {
  getSectionControlComponent(section: Object) {
    const ElementMapper = getElements();
    return ElementMapper[section.type] && ElementMapper[section.type].control
      ? ElementMapper[section.type].control
      : null;
  }

  onSectionChange(model: Object) {
    const {onChange} = this.props;
    onChange(model);
  }

  onElementChange(_element: Object) {
    const {onChange, model} = this.props;

    onChange({...model, _element});
  }

  getElement(
    model: Object,
    settings: Object,
    editMode: boolean,
    onElementChange: Function,
    onElementAdd: Function,
    onElementRemove: Function
  ) {
    if (model._element) {
      return (
        <Element
          model={model._element}
          settings={settings}
          editMode={editMode}
          onChange={onElementChange.bind(this)}
          onRemove={onElementRemove.bind(this)}
        />
      );
    } else {
      return editMode
        ? <ElementSelect onElementSelect={onElementAdd.bind(this)} />
        : null;
    }
  }

  onElementRemove(_element: Object) {
    const {model} = this.props;
    let newSection = {...model, _element: null};
    this.props.onChange(newSection);
  }

  onElementAdd(name: String) {
    const {model} = this.props;
    const ElementMapper = getElements();

    model._element = {
      type: name,
      val: JSON.parse(JSON.stringify(ElementMapper[name].defaultVal))
    };

    this.props.onChange(model);
  }

  onMove(model: Object, moveSteps: number) {
    this.props.onMove(moveSteps);
  }

  render() {
    const {model, editMode, onRemove, settings} = this.props;
    const {
      getSectionControlComponent,
      onElementChange,
      onElementAdd,
      onElementRemove,
      onMove
    } = this;

    return (
      <StyleContainer
        editMode={editMode}
        model={model}
        className={['rpe-section-style-container']}
      >
        <SectionControl
          className={['rpe-section-control']}
          editMode={editMode}
          model={model}
          controls={getSectionControlComponent(model)}
          onChange={this.onSectionChange.bind(this)}
          onRemove={onRemove}
          onMove={onMove.bind(this, model)}
        />
        {this.getElement(
          model,
          settings,
          editMode,
          onElementChange,
          onElementAdd,
          onElementRemove
        )}
      </StyleContainer>
    );
  }
}

Section.propTypes = {
  model: PropTypes.shape({
    padding: PropTypes.shape({
      t: PropTypes.number,
      r: PropTypes.number,
      b: PropTypes.number,
      l: PropTypes.number
    }),
    containerStyle: PropTypes.number,
    _element: PropTypes.shape({})
  }).isRequired,
  editMode: PropTypes.bool,
  onChange: PropTypes.func,
  onRemove: PropTypes.func
};

export default Section;
