/* @flow */
import CallToActionView from './CallToActionView';
import CallToActionEditor from './CallToActionEditor';
import CallToActionControl from './CallToActionControl';

export default {
  name: 'Call To Action',
  defaultVal: {
    img: '',
    caption: '',
    text: '',
    links: [
      {
        link: '',
        linkText: 'View Details'
      }
    ]
  },
  editor: CallToActionEditor,
  control: CallToActionControl,
  view: CallToActionView
};
