/* @flow */

import React, {Component} from 'react';
import styled from 'styled-components';
import {Button} from '../../../layoutElements';

const ImageBanner = styled.img`
  width: 100%;
  src:${props => {
    return props.img ? props.img : '';
  }}
`;

const Figcaption = styled.div`
  background:black;
  color:white;
  line-height:36px;
  font-size:26px;
  min-height:40px;
`;

const Link = styled.a`
`;
const Content = styled.p`
`;
const ViewContainer = styled.div`
`;

const LinkItem = styled.div`
  text-align:right;
`;
export default class CallToActionView extends Component {
  static propTypes = {};

  render() {
    const {model: {val}} = this.props;
    const {img, caption, text, links} = val;
    console.log('val', val);
    return (
      <ViewContainer>
        <div>
          <ImageBanner src={img} />
          <Figcaption>
            {caption}
          </Figcaption>
        </div>

        <Content>
          {text}
        </Content>

        <div>
          {links.map((item, index) => {
            const {link, linkText} = item;
            return (
              <LinkItem key={link + ' ' + index}>
                <Link href={link}><Button.Secondary label={linkText} /></Link>
              </LinkItem>
            );
          })}
        </div>

      </ViewContainer>
    );
  }
}
