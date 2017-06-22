/* @flow */

import React, {Component} from 'react';
import ReactQuill from 'react-quill';

export default class TextEditor extends Component {
  static propTypes = {

  };

  onChange(text: String) {
    const {onChange, model} = this.props;
    let newModel = {...model};

    newModel.val.html = text;
    onChange(newModel);
  }

  render() {
    const {model} = this.props;
    const {onChange} = this;

    /*
      TODO:: css to set dynamic height, but how

      ql-container:
        height: auto !important;
      ql-editor:
        height: auto !important;
        min-height: 300px;


    */

    return (
      <div>
        <ReactQuill value={model.val.html} onChange={onChange.bind(this)} />
      </div>
    );
  }
}
