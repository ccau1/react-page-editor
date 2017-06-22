/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import styled from 'styled-components';
import {TextField} from 'material-ui';

const SectionsControlContainer = styled.div`
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
    padding: Object
  }

  constructor(props: Object) {
    super(props);

    this.state = {
      padding: !props.model.padding ? this.getDefaultPadding() : {
        t: props.model.padding.t || 0,
        r: props.model.padding.r || 0,
        b: props.model.padding.b || 0,
        l: props.model.padding.l || 0
      }
    };
  }

  componentWillReceiveProps(nextProps: Object): void {
    if (!nextProps.model.padding) {
      this.setState({
        padding: this.getDefaultPadding()
      });
    } else if (!fromJS(nextProps.model.padding).equals(fromJS(this.props.model.padding))) {
      this.setState({
        padding: nextProps.model.padding
      });
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
      onChange({...model, padding: {...this.getDefaultPadding(), ...model.padding, [field]: paddingParsed}});
    }
  }

  render() {
    const {editMode} = this.props;
    const {padding} = this.state;
    return editMode ? (
      <SectionsControlContainer>
        <span>Container Spacing: </span>
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
      </SectionsControlContainer>
    ) : null;
  }
}
