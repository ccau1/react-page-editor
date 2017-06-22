/* @flow */

import React, {Component} from 'react';
import sizeMe from 'react-sizeme';
import {Flex, Box} from 'reflexbox';
import FileAsset from 'material-ui/svg-icons/editor/insert-drive-file';

class AttachmentsView extends Component {
  static propTypes = {

  };

  render() {
    const {model: {val: {files, fileHeight, title}}} = this.props;
    const {width} = this.props.size;

    const getReflexCol = (parentWidth: number) => {
      let col = 12;
      if (parentWidth > 700) {
        col = 4;
      } else if (parentWidth > 560) {
        col = 5;
      } else if (parentWidth > 420) {
        col = 6;
      }

      return col;
    };

    return (
      <div>
        {title !== '' && <h2>{title}</h2>}
        <Flex wrap>
          {files.map((file, fileIndex) => {
            return (
              <Box col={getReflexCol(width)} key={fileIndex} style={styles.fileContainer}>
                <a href={file.url} download>
                  {
                    file.thumbnail ?
                      <img src={file.thumbnail} style={{...styles.fileThumbnail, height: fileHeight + 'px'}} />
                      : <FileAsset style={styles.fileIcon} />
                  }
                  <p style={styles.fileName}>{file.name}</p>
                </a>
              </Box>
            );
          })}
        </Flex>
      </div>
    );
  }
}

export default sizeMe({monitorHeight: false})(AttachmentsView);

const styles = {
  fileContainer: {
    margin: '20px 0'
  },
  fileThumbnail: {
    display: 'block',
    margin: '0 auto'
  },
  fileIcon: {
    display: 'block',
    width: '60px',
    height: '60px',
    fontSize: '30pt',
    margin: '10px auto'
  },
  fileName: {
    textAlign: 'center'
  }
};
