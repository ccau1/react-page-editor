/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Section from './Section';
import SectionAdd from './SectionAdd';
import ElementMapper from '../Element/plugins';
import uuid from '../helpers/uuid';
import styled from 'styled-components';
import SectionsControl from './SectionsControl';

const SectionsContainer = styled.div`
  &.edit {
    border: 1px dashed #e6e6e6;
    padding: 3px;
  }
  padding: ${props => !props.editMode && props.model.padding ? props.model.padding.t + 'px ' + props.model.padding.r + 'px ' + props.model.padding.b + 'px ' + props.model.padding.l + 'px' : '0px'}
`;

export default class Sections extends Component {
  onAddClick(newSection: Object) {
    const {model} = this.props;
    model.items.push(newSection);
    this.props.onChange(model);
  }

  onSectionsChange(sections: Object) {
    this.props.onChange(sections);
  }

  onSectionChange(section: Object) {
    const {onChange, model} = this.props;

    const idx = model.items.findIndex(sec => sec.identifier === section.identifier);
    if (idx > -1) {
      model.items[idx] = section;
      // the plugins views page maybe call the function;
      onChange && onChange(model);
    } else {
      throw new Error('updating on element with invalid identifier');
    }
  }

  onSectionRemove(section: Object) {
    const {onChange, model} = this.props;

    const idx = model.items.findIndex(sec => sec.identifier === section.identifier);
    if (idx > -1) {
      model.items.splice(idx, 1);
      onChange(model);
    } else {
      throw new Error('updating on element with invalid identifier');
    }
  }

  onElementAdd(name: string) {
    const {model} = this.props;
    model.items.push({
      _element: {
        type: name,
        val: {
          ...ElementMapper[name].defaultVal
        }
      },
      identifier: uuid(),
      hallo: 'hello'
    });

    this.props.onChange(model);
  }

  onMove(section: Object, sectionIndex: number, moveSteps: number) {
    const {model} = this.props;
    let newPos = sectionIndex + moveSteps;
    if (newPos < 0) {
      newPos = 0;
    } else if (newPos >= model.length) {
      newPos = model.length - 1;
    }

    model.items.splice(newPos, 0, model.items.splice(sectionIndex, 1)[0]);
    this.props.onChange(model);
  }

  render() {
    const {model, editMode, settings} = this.props;
    const {onSectionChange, onSectionRemove, onAddClick, onMove} = this;

    return (
      <SectionsContainer model={model} className={(editMode ? 'edit ' : '') + 'rpe-sections'}>
        <SectionsControl editMode={editMode} model={model} onChange={this.onSectionsChange.bind(this)} />
        {model.items.map((section, sectionIndex) => {
          return (
            <Section
              key={sectionIndex}
              model={section}
              settings={settings}
              onMove={onMove.bind(this, section, sectionIndex)}
              editMode={editMode}
              onChange={onSectionChange.bind(this)}
              onRemove={onSectionRemove.bind(this)}
            />
          );
        })}
        {editMode && <SectionAdd onAdd={onAddClick.bind(this)} />}
      </SectionsContainer>
    );
  }
}

Sections.propTypes = {
  model: PropTypes.shape({
    padding: PropTypes.shape({
      t: PropTypes.number,
      r: PropTypes.number,
      b: PropTypes.number,
      l: PropTypes.number
    }),
    items: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  settings: PropTypes.shape({}),
  editMode: PropTypes.bool,
  onChange: PropTypes.func
};

Sections.defaultProps = {
  onChange: (sections: Object) => {}
};
