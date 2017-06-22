/* @flow */
import AttachmentsView from './AttachmentsView';
import AttachmentsEditor from './AttachmentsEditor';
import AttachmentsControl from './AttachmentsControl';

export default {
  name: 'Attachments',
  defaultVal: {
    title: '',
    fileHeight: 150,
    files: []
  },
  editor: AttachmentsEditor,
  control: AttachmentsControl,
  view: AttachmentsView
};
