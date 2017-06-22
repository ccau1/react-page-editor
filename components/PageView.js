/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sections from './Sections/Sections';
import styled from 'styled-components';

const PageViewContainer = styled.div`

`;

export default class PageView extends Component {
  static propTypes = {
    model: PropTypes.shape({
      sections: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({}))
      })
    }).isRequired,
    settings: PropTypes.shape({})
  };

  render() {
    const {model, settings} = this.props;
    // const {model: {content: {settings, sections}}} = this.props;

    return (
      <PageViewContainer className={'rpe'}>
        <Sections editMode={false} model={model.sections} settings={settings} />
      </PageViewContainer>
    );
  }
}
