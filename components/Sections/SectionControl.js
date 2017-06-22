/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '../layoutElements/Button';
import IconClose from 'material-ui/svg-icons/navigation/close';
import IconUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import styled from 'styled-components';
import {TextField} from 'material-ui';
import {fromJS} from 'immutable';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {containerStyles} from '../helpers/StyleContainer';

const SectionControlContainer = styled.div`
  text-align: right;
`;

export default class SectionControl extends Component {
  static propTypes = {
    onRemove: PropTypes.func,
    model: PropTypes.shape({
      type: PropTypes.string
    })
  };

  state: {
    padding: Object,
    containerStyle: number
  };

  constructor(props: Object) {
    super(props);
    const {model} = props;
    this.state = {
      padding: !props.model.padding
        ? this.getDefaultPadding()
        : {
          t: props.model.padding.t || 0,
          r: props.model.padding.r || 0,
          b: props.model.padding.b || 0,
          l: props.model.padding.l || 0
        },
      containerStyle: model.containerStyle || 0
    };
  }

  componentWillReceiveProps(nextProps: Object): void {
    if (!nextProps.model.padding) {
      this.setState({
        padding: this.getDefaultPadding()
      });
    } else if (
      !fromJS(nextProps.model.padding).equals(fromJS(this.props.model.padding))
    ) {
      this.setState({
        padding: nextProps.model.padding
      });
    }
  }

  componentDidMount(): void {
    if (!this.props.model.containerStyle) {
      this.props.onChange({...this.props.model, containerStyle: containerStyles.NONE.key});
    }
  }

  getDefaultPadding() {
    return {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    };
  }

  onPaddingChange(field: string, ev: Object) {
    const {onChange, model} = this.props;
    const padding = ev.target.value;
    this.state.padding[field] = padding;
    this.setState({
      padding: this.state.padding
    });
    const paddingParsed = parseInt(padding, 10);
    if (!isNaN(padding) && paddingParsed > -1) {
      onChange({
        ...model,
        padding: {
          ...this.getDefaultPadding(),
          ...model.padding,
          [field]: paddingParsed
        }
      });
    }
  }
  onContainerStyleChange = (ev: Object, index: number, newValue: string) => {
    const {onChange, model} = this.props;
    const newModel = {...model, containerStyle: newValue};
    onChange(newModel);
  };

  render() {
    const {onRemove, model, onMove, editMode} = this.props;
    const {padding} = this.state;

    return editMode
      ? <SectionControlContainer>
          <span>Container Style:</span>
          <SelectField
            style={{verticalAlign: 'bottom'}}
            value={model.containerStyle}
            onChange={this.onContainerStyleChange}
          >
            {Object.keys(containerStyles).map((itemKey, index) => {
              const {key, text} = containerStyles[itemKey];
              return (
                <MenuItem
                  key={'menuitem ' + index}
                  value={key}
                  primaryText={text}
                />
              );
            })}
          </SelectField>
          <span>Section Spacing: </span>
          <TextField
            hintText="in px"
            floatingLabelText="Top"
            type="number"
            min={0}
            value={padding.t}
            onChange={this.onPaddingChange.bind(this, 't')}
            style={{width: 50}}
          />
          <TextField
            hintText="in px"
            floatingLabelText="Right"
            type="number"
            min={0}
            value={padding.r}
            onChange={this.onPaddingChange.bind(this, 'r')}
            style={{width: 50}}
          />
          <TextField
            hintText="in px"
            floatingLabelText="Bottom"
            type="number"
            min={0}
            value={padding.b}
            onChange={this.onPaddingChange.bind(this, 'b')}
            style={{width: 50}}
          />
          <TextField
            hintText="in px"
            floatingLabelText="Left"
            type="number"
            min={0}
            value={padding.l}
            onChange={this.onPaddingChange.bind(this, 'l')}
            style={{width: 50}}
          />
          <Button.Icon
            style={styles.iconButton}
            onClick={onMove.bind(this, -1)}
          >
            <IconUp />
          </Button.Icon>
          <Button.Icon style={styles.iconButton} onClick={onMove.bind(this, 1)}>
            <IconDown />
          </Button.Icon>
          <Button.Icon
            style={styles.iconButton}
            onClick={onRemove.bind(this, model)}
          >
            <IconClose />
          </Button.Icon>
        </SectionControlContainer>
      : null;
  }
}

const styles = {
  iconButton: {
    background: 'rgba(236, 236, 236, 0.4)'
  }
};
