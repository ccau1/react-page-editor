import ContactFormView from './ContactFormView';
import ContactFormEditor from './ContactFormEditor';
import ContactFormControl from './ContactFormControl';

export default {
  name: 'Contact Form',
  defaultVal: {
    from: '',
    to: '',
    subjectPrefix: '',
    subject: '',
    body: '',
    api: ''
  },
  editor: ContactFormEditor,
  control: ContactFormControl,
  view: ContactFormView
};
