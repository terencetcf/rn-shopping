import React, { useState } from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';

import { ICartItem } from '../../models/cart-Item';
import CartItem from './CartItem';

interface IProps {
  items: ICartItem[];
}

const OrderDetails: React.FC<IProps> = ({ items, ...props }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <Button
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails((current) => !current)}
      />
      {showDetails && (
        <FlatList<ICartItem>
          keyExtractor={(item) => item.productId}
          data={items}
          renderItem={(cartData) => <CartItem cartItem={cartData.item} />}
        />
      )}
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
