import React from 'react';
import {
  Platform,
} from 'react-native';

import Picker, {
  Themes,
} from './Picker';


if (Platform.OS !== 'android') {
  console.warn('You have included react-native-fixed-android-picker on a non-Android device.');
}


export {
  Themes,
};
export default Picker;
