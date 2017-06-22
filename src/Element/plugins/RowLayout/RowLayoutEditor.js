/* @flow */

import React, {Component} from 'react';
import {Flex, Box} from 'reflexbox';
import Sections from '../../../Sections/Sections';
import styled from 'styled-components';
import {TextField,NonNullTextField} from '../../../layoutElements/index';

const FlexDiv = styled.div`
   display:flex;
   flex:1;
   width: ${({width}) => (width ? width : 'initial')};
   flex-basis: ${({percentage}) => (percentage ? percentage + '%' : 0)};
`;

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

class RowLayoutEditor extends Component {
  static propTypes = {};

  componentWillReceiveProps(nextProps: Object): void {
    if (nextProps.model.val) {
      const val = nextProps.model.val;
      this.syncSplitRows(val.split, val.rows, nextProps);
    }
  }

  onSectionsChange(index: number, rowSections: Object) {
    const {onChange, model} = this.props;
    console.log('index', index, rowSections);
    let newModel = {...model};
    newModel.val.rows[index] = rowSections;
    console.log('onSectionsChange', index, rowSections, newModel.val.rows);

    onChange(newModel);
  }

  // onSectionRemove(section: Object) {
  //   const {onChange, model} = this.props;
  //   let newModel = {...model};

  //   const idx = newModel.val.sections.findIndex(sec => sec.identifier === section.identifier);
  //   if (idx > -1) {
  //     model.val.sections.splice(idx, 1);
  //     model.val.split--;
  //     onChange(model);
  //   } else {
  //     throw new Error('updating on element with invalid identifier');
  //   }
  // }

  onColumnChange = (name: string, index: number, rowSections: Object) => (
    newValue: string,
    event: Object
  ) => {
    this.handleChange(name, index, rowSections, newValue);
  };


  handleChecked = (name: string, index: number, rowSections: Object) => (
    event: Object,
    isInputChecked: boolean
  ) => {
    this.handleChange(name, index, rowSections, isInputChecked);
  };

  handleChange = (
    name: string,
    index: number,
    rowSections: Object,
    newValue: string | boolean
  ) => {
    const {onChange, model} = this.props;

    let newModel = {...model};
    const newSettings = {...rowSections.compSettings};
    newSettings[name] = newValue;
    rowSections.compSettings = newSettings;
    newModel.val.rows[index] = rowSections;
    onChange(newModel);
  };

  displayRow(val: Object) {
    const {settings, editMode, model} = this.props;
    const {onSectionsChange} = this;
    return val.rows.map((rowSections, sectionIndex) => {
      const {
        widthPercentage,
        // TODO
        isWidthPercentage,
        columnWidth
      } =
        rowSections.compSettings || {};
      return (
        <Box key={sectionIndex} auto>

          <div>
            <NonNullTextField
              type="number"
              value={widthPercentage}
              floatingLabelText="Column Width Percentage"
              onChange={this.onColumnChange(
                'widthPercentage',
                sectionIndex,
                rowSections
              )}
              fullWidth={true}
            />

          </div>
          <Sections
            model={rowSections}
            settings={settings}
            editMode={editMode}
            onChange={onSectionsChange.bind(this, sectionIndex)}
          />
        </Box>
      );
    });
  }

  syncSplitRows(split: number, rows: Array<[]>, props: Object) {
    const diff = split - rows.length;
    if (diff !== 0) {
      if (diff > 0) {
        for (let i = 0; i < diff; i++) {
          rows.push([]);
        }
        this.props.onChange(props.model);
      } else if (diff < 0) {
        rows.splice(split);
        this.props.onChange(props.model);
      }
    }
  }

  render() {
    const {model: {val}} = this.props;

    return (
      <div>
        <FlexDiv>
          {this.displayRow(val)}
        </FlexDiv>
      </div>
    );
  }
}

export default RowLayoutEditor;
