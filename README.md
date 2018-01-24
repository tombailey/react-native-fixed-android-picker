# react-native-fixed-android-picker
A React Native Android module to work around the ['Android Picker not consistently firing onValueChange()' issue](https://github.com/facebook/react-native/issues/15556#issuecomment-359478181).

## Installation

We aren't on the NPM registry yet so:

```bash
npm install github:tombailey/react-native-fixed-android-picker --save
```

Link the native modules:

```bash
react-native link
```

## Example usage
```javascript

import React, {
  Component,
} from 'react';

import Picker, {
  Themes,
} from 'react-native-fixed-android-picker';

class SomeComponent extends Component {
  constructor(props) {
    super(props);

    this.fruitItems = [{
      label: 'Apples',
      value: 'app',
    }, {
      label: 'Bananas',
      value: 'ban',
    }, {
      label: 'Mangos',
      value: 'man',
    }];

    this.state = {
      selectedValue: fruitItems[0].value,
    };
  }

  render() {
    <Picker
      theme={Themes.DARK}
      selectedValue={this.state.selectedValue}
      items={this.fruitItems}
      onValueChange={(fruitItem, index) => {
        this.setState({
          selectedValue: fruitItem.value,
        })
      }} />
  }
}

```

## Custom styling

This picker is made of a few components which makes it difficult to support custom styling since:
  - you would need to know what each component does
  - you would likely need to pass style props for each of those components
  - the native Android dialog shown with the picker's options needs to be themed natively

For the reasons above, we recommend either using one of predefined themes (Themes.DARK or Themes.LIGHT) or taking a fork of this library and changing it how you wish.

## License

MIT
