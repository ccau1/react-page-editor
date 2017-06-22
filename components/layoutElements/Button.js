import React from 'react';
// import styled from 'styled-components';
import {FlatButton, RaisedButton, IconButton} from 'material-ui';


export const Default = ({children, ...props}: Object) => {
  return (
    <RaisedButton {...props}>
      {children}
    </RaisedButton>
  );
};

export const Primary = ({children, ...props}: Object) => {
  return (
    <RaisedButton primary={true} {...props}>
      {children}
    </RaisedButton>
  );
};

export const Secondary = ({children, ...props}: Object) => {
  return (
    <RaisedButton secondary={true} {...props}>
      {children}
    </RaisedButton>
  );
};

export const Link = ({children, ...props}: Object) => {
  return (
    <FlatButton {...props}>
      {children}
    </FlatButton>
  );
};

export const Icon = ({children, ...props}: Object) => {
  return (
    <IconButton {...props}>
      {children}
    </IconButton>
  );
};

export default {
  Default,
  Primary,
  Secondary,
  Link,
  Icon
};
