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

Custom styling is difficult because this library uses a mixture of React Native views and Android native dialogs

The simplest custom styling can be applied by using one of our predefined themes (Themes.DARK or Themes.LIGHT):
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

Alternatively, we have provided support for passing a styles prop which can change how the label and icon for the dropdown look:

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

Or you can even provide your own custom view for the dropdown:
```javascript
const customView = (
  <View>
    ...
  </View>
);

...

const picker = (
  <Picker
    items={this.fruitItems}
    ...
    dropDownComponent={customView} />
)
```

If none of these options work for you, feel free to take a fork of this library and change it how you wish.

## License

MIT
