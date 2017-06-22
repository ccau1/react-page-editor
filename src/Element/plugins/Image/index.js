/* @flow */
import ImageView from './ImageView';
import ImageEditor from './ImageEditor';
import ImageControl from './ImageControl';

export default {
  name: 'Image',
  defaultVal: {
    url: ''
  },
  editor: ImageEditor,
  control: ImageControl,
  view: ImageView
};
