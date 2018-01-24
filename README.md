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

import Picker from 'react-native-fixed-android-picker';

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

We have provided support for passing a styles prop which can change how the label and icon for the picker look:

```javascript
<Picker
  items={this.fruitItems}
  ...
  styles={{
    label: {
      backgroundColor: '#FF0000',
      fontSize: 20,
    },
    icon: {
      backgroundColor: '#00FF00',
      marginLeft: 100,
    },
  }} />
```

We have also provided support for two predefined themes (Themes.DARK or Themes.LIGHT):
```javascript
import Picker, {
  Themes,
} from 'react-native-fixed-android-picker';

...

<Picker
  items={this.fruitItems}
  ...
  theme={Themes.DARK} />
```

If neither of these options work for you, feel free to take a fork of this library and change it how you wish.

## License

MIT
