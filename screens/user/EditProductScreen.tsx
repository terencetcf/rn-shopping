import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import TextField from '../../components/TextField';
import * as productsActions from '../../store/actions/products';
import numberHelper from '../../helpers/numberHelper';
import DefaultHeaderButtons from '../../components/default/DefaultHeaderButtons';
import Loader from '../../components/Loader';
import { RootStackNavigatorParamList } from '../../navigation/ShopNavigator';

interface IProps extends StackScreenProps<RootStackNavigatorParamList> {
  route: RouteProp<RootStackNavigatorParamList, 'EditProduct'>;
}

const EditProductScreen: React.FC<IProps> = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const productId = props.route.params?.productId;
  const productToEdit = useSelector<IRootState, Product | undefined>((state) =>
    state.products.userProducts.find((p) => p.id === productId)
  );

  const [title, setTitle] = useState(productToEdit ? productToEdit.title : '');
  const [imageUrl, setImageUrl] = useState(
    productToEdit ? productToEdit.imageUrl : ''
  );
  const [price, setPrice] = useState(
    productToEdit ? productToEdit.price.toString() : ''
  );
  const [description, setDescription] = useState(
    productToEdit ? productToEdit.description : ''
  );

  const validateForm = () => {
    return title.length > 0 && imageUrl.length > 0 && isPriceValid();
  };

  const dispatch = useDispatch();

  const submitHandler = useCallback(async () => {
    if (!validateForm()) {
      Alert.alert(
        'Invalid entry',
        'Please make sure you have fill in all the required field(s).',
        [{ text: 'Ok', style: 'default' }]
      );
      return;
    }

    setError('');
    setIsLoading(true);

    let errOccurred = false;
    const enteredProduct = {
      title,
      imageUrl,
      price: numberHelper.parse(price),
      description,
    } as Product;

    try {
      if (productToEdit) {
        await dispatch(
          productsActions.editProduct({
            ...productToEdit,
            ...enteredProduct,
          })
        );
      } else {
        await dispatch(productsActions.addProduct(enteredProduct));
      }
    } catch (err) {
      setError(err.message);
      errOccurred = true;
    }

    setIsLoading(false);

    if (!errOccurred) {
      navigation.goBack();
    }
  }, [dispatch, productToEdit, title, imageUrl, price, description]);

  useEffect(() => {
    return () => {
      setTitle('');
      setImageUrl('');
      setPrice('');
      setDescription('');
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DefaultHeaderButtons
          title="Save"
          iconName="ios-checkmark"
          iconNameAndroid="md-checkmark"
          onPress={submitHandler}
          disabled={!validateForm()}
        />
      ),
    });
  }, [submitHandler]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error occurred!',
        'Unable to save the product details, please try again later',
        [{ text: 'Ok', style: 'default' }]
      );
    }
  }, [error]);

  const isPriceValid = (): boolean => +price > 0;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <TextField
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            required
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
            keyboardType="url"
            required
          />
          <TextField
            label="Price"
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="decimal-pad"
            validate={isPriceValid}
            validateErrorMessage="Please enter a valid price"
            required
          />
          <TextField
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const EditProductScreenOptions = (navData: any) => {
  const headerTitle = navData.route.params?.productTitle || 'Add Product';

  return {
    headerTitle,
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
