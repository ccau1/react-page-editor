import text from './Text';
import rowLayout from './RowLayout';
import attachments from './Attachments';
import image from './Image';
import map from './Map';
import contactForm from './ContactForm';
import callToAction from './CallToAction';
import video from './Video';
import PageElementPlugins from '../../PageElementPlugins';


console.log('PageElementPlugins.getElements()', PageElementPlugins.getElements());

export const getElements = () => {
  return {
    text,
    rowLayout,
    attachments,
    image,
    map,
    video,
    contactForm,
    callToAction,
    ...PageElementPlugins.getElements()
  };
};

export default getElements();
