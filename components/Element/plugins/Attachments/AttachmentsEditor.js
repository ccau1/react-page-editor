/* @flow */

import React, {Component} from 'react';
import {Button, TextField} from '../../../layoutElements';
import styled from 'styled-components';
import {Flex, Box} from 'reflexbox';
import sizeMe from 'react-sizeme';

const FileContainer = styled.div`
    background: #fbfbfb;
    border: 1px solid #e6e6e6;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
`;


class AttachmentsEditor extends Component {
  static propTypes = {

  };

  state: {
    fileHeight: number
  }

  constructor(props: Object): void {
    super(props);
    this.state = {
      fileHeight: props.fileHeight || 150
    };
  }

  onTitleChange(ev: Object): void {
    let value = ev.target.value;
    let newModel = {...this.props.model};
    newModel.val.title = value;
    this.props.onChange(newModel);
  }

  onFieldChange(file: Object, field: string, ev: Object): void {
    let value = ev.target.value;
    file[field] = value;
    this.props.onChange(this.props.model);
  }

  removeFileByIndex(index: number): void {
    let files = this.props.model.val.files;
    files.splice(index, 1);
    this.props.onChange(this.props.model);
  }

  addAttachment(): void {
    this.props.model.val.files.push({
      url: '',
      name: '',
      thumbnail: ''
    });
    this.props.onChange(this.props.model);
  }

  onHeightChange(ev: Object): void {
    const {model} = this.props;
    const newHeight = ev.target.value;
    this.setState({
      fileHeight: newHeight
    });
    const parsedHeight = parseFloat(newHeight);
    if (!isNaN(parsedHeight) && parsedHeight > 0) {
      let newModel = {...model};
      newModel.val.fileHeight = parsedHeight;
      this.props.onChange({...newModel});
    }
  }

  render() {
    const {model: {val}} = this.props;
    const {width} = this.props.size;
    const {fileHeight} = this.state;

    const getReflexCol = (parentWidth: number) => {
      let col = 12;
      if (parentWidth > 1000) {
        col = 3;
      } else if (parentWidth > 870) {
        col = 4;
      } else if (parentWidth > 735) {
        col = 6;
      }

      return col;
    };

    return (
      <div>
        <TextField value={val.title} onChange={this.onTitleChange.bind(this)} floatingLabelText={'Title'} />
        <TextField type="number" value={fileHeight} onChange={this.onHeightChange.bind(this)} floatingLabelText={'File Height'} />
        <Button.Link onClick={this.addAttachment.bind(this)} label={'Add Attachment'} />
        <Flex flexColumn={false} wrap>
          {val.files.map((file, fileIndex) => {
            return (
              <Box col={getReflexCol(width)} key={fileIndex}>
                <FileContainer>
                  <TextField value={file.url} onChange={this.onFieldChange.bind(this, file, 'url')} floatingLabelText={'URL'} />
                  <br />
                  <TextField value={file.thumbnail} onChange={this.onFieldChange.bind(this, file, 'thumbnail')} floatingLabelText={'Thumbnail'} />
                  <br />
                  <TextField value={file.name} onChange={this.onFieldChange.bind(this, file, 'name')} floatingLabelText={'Name'} />
                  <Button.Link onClick={this.removeFileByIndex.bind(this, fileIndex)}>Remove</Button.Link>
                </FileContainer>
              </Box>
            );
          })}
        </Flex>
      </div>
    );
  }
}


export default sizeMe({monitorHeight: false})(AttachmentsEditor);
