/* @flow */
import VideoView from './VideoView';
import VideoEditor from './VideoEditor';
import  VideoControl from './VideoControl';

export default {
  name: 'Video',
  defaultVal: {
    html: ''
  },
  editor: VideoEditor,
  control: VideoControl,
  view: VideoView
};
