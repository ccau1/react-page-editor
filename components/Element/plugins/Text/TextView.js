/* @flow */

import React, {Component} from 'react';
import renderHTML from 'react-render-html';

export default class TextView extends Component {
  static propTypes = {

  };

  displayHtml(html: string) {
    return renderHTML(html);
  }

  render() {
    const {model} = this.props;

    return (
      <div>
        {this.displayHtml(model.val.html)}
      </div>
    );
  }
}
