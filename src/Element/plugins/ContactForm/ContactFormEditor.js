import React, {Component} from 'react';
import {NonNullTextField as TextField} from '../../../layoutElements';

import styled from 'styled-components';

const FlexDiv = styled.div`
   display:flex;
   flex:1;
   width: ${({width}) => (width ? width : 'initial')};
   flex-basis: ${({percentage}) => (percentage ? percentage + '%' : 0)};
`;

class ContactFormEditor extends Component {
  static propTypes = {};

  onContentChange = name => (newValue: string, event: Object) => {
    const {onChange, model} = this.props;
    let newModel = {...model};

    newModel.val[name] = newValue;
    onChange(newModel);
  };

  renderForm(val: Object) {
    return (
      <form action="#" onSubmit={e => e.preventDefault()}>
        {['to', 'api', 'subjectPrefix'].map((str, item) => {
          return (
            <div key={str + ' ' + item}>
              <TextField
                onChange={this.onContentChange(str)}
                name={str}
                type="text"
                floatingLabelText={str}
                value={val[str]}
              />
            </div>
          );
        })}
      </form>
    );
  }

  render() {
    const {model: {val}} = this.props;

    return (
      <div>
        <FlexDiv>
          {this.renderForm(val)}
        </FlexDiv>
      </div>
    );
  }
}

export default ContactFormEditor;
