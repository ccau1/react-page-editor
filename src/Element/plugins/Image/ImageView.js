/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components';

class ImageView extends Component {
  static propTypes = {

  };

  render() {
    const {model: {val}, className} = this.props;
    return (
      <img className={className} src={val.url} />
    );
  }
}

export default styled(ImageView)`
  width: 100%;
  height: auto;
`;
