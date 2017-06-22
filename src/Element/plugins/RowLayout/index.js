/* @flow */
import RowLayoutView from './RowLayoutView';
import RowLayoutEditor from './RowLayoutEditor';
import RowLayoutControl from './RowLayoutControl';

export default {
  name: 'Row Layout',
  defaultVal: {
    split: 3,
    rows: [
      {
        items: []
      },
      {
        items: []
      },
      {
        items: []
      }
    ]
  },
  editor: RowLayoutEditor,
  control: RowLayoutControl,
  view: RowLayoutView
};
