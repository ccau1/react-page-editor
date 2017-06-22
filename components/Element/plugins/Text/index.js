/* @flow */
import TextView from './TextView';
import TextEditor from './TextEditor';
import TextControl from './TextControl';

export default {
  name: 'Text',
  defaultVal: {
    html: ''
  },
  editor: TextEditor,
  control: TextControl,
  view: TextView
};
