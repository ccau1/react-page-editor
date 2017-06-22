import React from 'react';
import {Card} from 'material-ui/Card';
import styled from 'styled-components';

const GrayBorder = styled.div`
    border: 4px solid #e6e6e6!important;
`;

export const containerStyles = {
  NONE: {
    key: 0,
    text: 'None'
  },
  CARD: {
    key: 1,
    text: 'Card'
  },
  GRAY_BORDER: {
    key: 2,
    text: 'Gray Border'
  }
};

class StyleContainer extends React.Component {
  static defaultProps = {
    model: {
      containerStyle: containerStyles.NONE.key
    }
  };

  render() {
    const {model, editMode, children, ...rest} = this.props;
    if (editMode) {
      return <div {...rest}>{children}</div>;
    }
    switch (model.containerStyle) {
      case containerStyles.CARD.key:
        return <Card {...rest}>{children}</Card>;
      case containerStyles.GRAY_BORDER.key:
        return <GrayBorder {...rest}>{children}</GrayBorder>;
      case containerStyles.NONE.key:
      default:
        return <div {...rest}>{children}</div>;
    }
  }
}


export default styled(StyleContainer)`
  padding: ${props =>
    !props.editMode && props.model.padding
      ? props.model.padding.t +
          'px ' +
          props.model.padding.r +
          'px ' +
          props.model.padding.b +
          'px ' +
          props.model.padding.l +
          'px'
      : '0px'};
  border-radius: ${props => (!props.editMode ? '0px' : '8px')};
  border: ${props => (!props.editMode ? '0px' : '1px solid #e6e6e6')};
  margin-bottom: ${props => (!props.editMode ? '0px' : '20px')};
  min-height: ${props => (!props.editMode ? '0px' : '100px')};
`;
