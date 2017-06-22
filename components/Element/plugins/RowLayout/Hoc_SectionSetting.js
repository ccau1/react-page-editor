import React, {PureComponent} from 'react';
import Slider from 'material-ui/Slider';
import {TextField} from '../../../layoutElements/index';
import {Flex} from 'reflexbox';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  block: {
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

export default function SectionSettingHoc(Comp): React.PureComponent {
  class SectionSettingWrapper extends PureComponent {
    state = {
      widthPercentage: 50,
      isWidthPercentage: true,
      columnWidth: '',
      heightPercentage: 25,
      isHeightPercentage: true,
      columnHeight: ''
    };

    handleSlider = name => (event, newValue) => {
      this.handleChange(name, newValue);
    };

    handleChecked = name => (event: Object, isInputChecked: boolean) => {
      this.handleChange(name, isInputChecked);
    };

    handleChange = (name, newValue) => {
      const {onChange, model} = this.props;
      this.setState(() => {
        const newCompSettings = {
          ...model.compSettings,
          [name]: newValue
        };
        onChange({...model, compSettings: newCompSettings});

        return {[name]: newValue};
      });
    };

    onColumnChange = name => (event: Object, newValue: string) => {
      this.handleChange(name, newValue);
    };

    render() {
      const {editMode} = this.props;
      const {
        widthPercentage,
        isWidthPercentage,
        columnWidth,
        heightPercentage,
        isHeightPercentage,
        columnHeight
      } = this.props.model.compSettings
        ? this.props.model.compSettings
        : this.state;

      const compSettings = {
        width: {
          widthPercentage,
          columnWidth: isWidthPercentage ? columnWidth : 0
        },
        height: {
          heightPercentage,
          columnHeight: isHeightPercentage ? columnHeight : 0
        }
      };

      return (
        <section>
          <Comp {...this.props} compSettings={compSettings} />
          {editMode &&
            <Flex>
              <div style={{marginRight: 10}}>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={widthPercentage}
                  onChange={this.handleSlider('widthPercentage')}
                />
                <p>
                  <span>{`Set the column width : `}</span>
                  <span>{widthPercentage}</span>
                  <span>
                    {' from a range of 0 to 100 inclusive percentage'}
                  </span>
                </p>
                <Checkbox
                  label={`Specific Width`}
                  style={styles.checkbox}
                  checked={isWidthPercentage}
                  onCheck={this.handleChecked('isWidthPercentage')}
                />
                <TextField
                  type="number"
                  value={columnWidth}
                  floatingLabelText="Column Width"
                  onChange={this.onColumnChange('columnWidth')}
                  disabled={!isWidthPercentage}
                />
                {' '}
                : px
              </div>

              <div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={heightPercentage}
                  onChange={this.handleSlider('heightPercentage')}
                />
                <p>
                  <span>{`Set the column height : `}</span>
                  <span>{heightPercentage}</span>
                  <span>
                    {'from a range of 0 to 100 inclusive percentage'}
                  </span>
                </p>
                <Checkbox
                  label={`Specific Width`}
                  style={styles.checkbox}
                  checked={isHeightPercentage}
                  onCheck={this.handleChecked('isHeightPercentage')}
                />
                <TextField
                  type="number"
                  value={columnHeight}
                  floatingLabelText="Column Height"
                  onChange={this.onColumnChange('columnHeight')}
                  disabled={!isHeightPercentage}
                />
                {' '}
                : px
              </div>
            </Flex>}
        </section>
      );
    }
  }

  return SectionSettingWrapper;
}
