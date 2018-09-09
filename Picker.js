import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import {
  NativeModules,
  View,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native';

import styles from './styles';

import dropDownImageWhite from './drop-down-arrow-white.png';
import dropDownImageBlack from './drop-down-arrow-black.png';


const THEMES = {
  LIGHT: 0,
  DARK: 1,
};


class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressPicker(values, labels) {
    NativeModules.FixedAndroidPicker.showPickerDialog(labels).then((index) => {
      this.setState({
        selectedValue: values[index],
      });
      this.props.onValueChange(values[index], index);
    }).catch((error) => {
      //dialog closed
    });
  }

  render() {
    const theme = this.props.theme;

    var dropDownImageSource;
    if (this.props.dropDownImageSource) {
      dropDownImageSource = this.props.dropDownImageSource;
    } else if (theme == THEMES.LIGHT) {
      dropDownImageSource = dropDownImageBlack;
    } else {
      dropDownImageSource = dropDownImageWhite;
    }

    const items = this.props.items;
    const labels = this.getLabels(items);
    const values = this.getValues(items);

    return (
      <View
        style={theme == THEMES.LIGHT ? styles.backgroundWhite : styles.backgroundBlack}>
        <TouchableNativeFeedback
          underlayColor={theme == THEMES.LIGHT ? '#FFFFFF' : '#000000'}
          style={styles.padding5}
          onPress={() => {
            this.onPressPicker(values, labels);
          }}>

          <View
            style={[
              styles.flexDirectionRow,
              styles.alignItemsCenter,
            ]}>

            {
              this.renderPickerComponent()
            }

          </View>

        </TouchableNativeFeedback>
      </View>
    );
  }

  renderPickerComponent() {
    if (this.props.dropDownComponent) {
      return this.props.dropDownComponent;
    } else {
      return this.getDefaultPickerComponent();
    }
  }

  getDefaultPickerComponent() {
    return (
      <Text
        style={[
          theme == THEMES.LIGHT ? styles.fontBlack : styles.fontWhite,
          this.props.styles.label,
        ]}>
        {
          labels[values.indexOf(this.state.selectedValue ? this.state.selectedValue : this.props.selectedValue)]
        }
    </Text>

    <Image
      source={dropDownImageSource}
      style={[
        styles.dropDownImage,
        styles.marginLeft5,
        this.props.styles.icon,
      ]}
      />
    );
  }

  getLabels(items) {
    return items.map((item) => {
      return item.label;
    });
  }

  getValues(items) {
    return items.map((item) => {
      return item.value;
    });
  }
}

Picker.propTypes = {
  selectedValue: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onValueChange: PropTypes.func.isRequired,
  dropDownImageSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.number.isRequired,
  ]),
  theme: PropTypes.number,
  styles: PropTypes.shape({
    icon: PropTypes.number,
    label: PropTypes.number,
  }),
  dropDownComponent: PropTypes.element,
};

Picker.defaultProps = {
  theme: THEMES.LIGHT,
  styles: {},
};


export {
  THEMES as Themes,
};
export default Picker;
