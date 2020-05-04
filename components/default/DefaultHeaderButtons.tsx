import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../UI/HeaderButton';
import device from '../../helpers/device';

interface IProps {
  navData: any;
  title: string;
  iconName: string;
  iconNameAndroid?: string;
  onPress: () => void;
}

const DefaultHeaderButtons: React.FC<IProps> = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title={props.title}
        iconName={
          device.isAndroid() && props.iconNameAndroid
            ? props.iconNameAndroid
            : props.iconName
        }
        onPress={props.onPress}
      />
    </HeaderButtons>
  );
};

export default DefaultHeaderButtons;
