import React, { ReactType } from 'react';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native';

import device from '../../helpers/device';

type Props = {
  onPress: () => void;
  useForeground?: boolean;
};

const DefaultTouchable: React.FC<Props> = ({
  onPress,
  useForeground,
  children,
}) => {
  const TouchableComp: ReactType = device.isRecentAndroid()
    ? TouchableNativeFeedback
    : TouchableOpacity;

  return (
    <TouchableComp onPress={onPress} useForeground={useForeground}>
      {children}
    </TouchableComp>
  );
};

export default DefaultTouchable;
