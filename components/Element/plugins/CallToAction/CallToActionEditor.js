/* @flow */

import React, {Component} from 'react';
import {Button, NonNullTextField as TextField} from '../../../layoutElements';
export default class CallToActionEditor extends Component {
  static propTypes = {};
  onContentChange = name => (newValue: string, ev) => {
    const {onChange, model} = this.props;
    // console.log('index', index, rowSections);
    let newModel = {...model};
    // newModel.val.rows[index] = rowSections;
    newModel.val[name] = newValue;
    onChange(newModel);
  };

  onLinkContentChange = (index: number, name: string) => (newValue: string) => {
    const {onChange, model} = this.props;
    let newModel = {...model};
    const {val} = newModel;
    const newLinks = [...val.links];
    newLinks[index][name] = newValue;
    val.links = newLinks;
    onChange(newModel);
  };

  addLink = () => {
    const {onChange, model} = this.props;
    let newModel = {...model};
    const {val} = newModel;
    const newLinks = [...val.links];
    newLinks.push({});
    val.links = newLinks;
    onChange(newModel);
  };
  render() {
    const {model: {val}} = this.props;
    const {links} = val;
    const texts = [
      {name: 'img'},
      {name: 'caption'},
      {name: 'text', multiLine: true, rows: 2}
    ];
    return (
      <div>
        {texts.map((item, index) => {
          const {name: str, ...rest} = item;
          return (
            <TextField
              {...rest}
              name={str}
              value={val[str]}
              floatingLabelText={str}
              key={str + ' ' + index}
              onChange={this.onContentChange(str)}
            />
          );
        })}
        <ul>

          {links.map((linkItem, index) => {
            const {link, linkText} = linkItem;
            return (
              <li key={'link ' + index}>
                <TextField
                  name="link"
                  value={link}
                  floatingLabelText={'link'}
                  onChange={this.onLinkContentChange(index, 'link')}
                />
                <TextField
                  name="linkText"
                  value={linkText}
                  floatingLabelText={'linkText'}
                  onChange={this.onLinkContentChange(index, 'linkText')}
                />
              </li>
            );
          })}
          <li>
            <Button.Link onTouchTap={this.addLink}>
              Add Link
            </Button.Link>
          </li>
        </ul>
      </div>
    );
  }
}
