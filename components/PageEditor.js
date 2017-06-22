/* @flow */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Sections from './Sections/Sections';

export default class PageEditor extends Component {
  static propTypes = {
    model: PropTypes.shape({
      sections: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.shape({}))
      })
    }).isRequired,
    settings: PropTypes.shape({}),
    onChange: PropTypes.func.isRequired
  };

  onSectionsChange(sections: Object) {
    const {model} = this.props;
    console.log('sections change', sections, model);
    this.props.onChange({...model, sections: sections});
  }

  render() {
    const {model, settings} = this.props;
    // const {model: {content: {settings, sections}}} = this.props;
    const {onSectionsChange} = this;

    return (
      <div>
        <Sections
          editMode={true}
          model={model.sections}
          settings={settings}
          onChange={onSectionsChange.bind(this)}
        />
      </div>
    );
  }
}
