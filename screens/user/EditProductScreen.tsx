import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import TextField from '../../components/TextField';
import * as productsActions from '../../store/actions/products';
import numberHelper from '../../helpers/numberHelper';
import DefaultHeaderButtons from '../../components/default/DefaultHeaderButtons';

type Params = {
  productId: string;
  productTitle: string;
  isFormValid: boolean;
  submit: () => void;
};

type ScreenProps = {};

const EditProductScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  const productId = navigation.getParam('productId');
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

  const submitHandler = useCallback(() => {
    if (!validateForm()) {
      Alert.alert(
        'Invalid entry',
        'Please make sure you have fill in all the required field(s).',
        [{ text: 'Ok', style: 'default' }]
      );
      return;
    }

    const enteredProduct = {
      title,
      imageUrl,
      price: numberHelper.parse(price),
      description,
    } as Product;

    if (productToEdit) {
      dispatch(
        productsActions.editProduct({
          ...productToEdit,
          ...enteredProduct,
        })
      );
    } else {
      dispatch(productsActions.addProduct(enteredProduct));
    }

    navigation.goBack();
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
    const isFormValid = validateForm();
    navigation.setParams({ isFormValid });
  }, [productToEdit, title, imageUrl, price]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const isPriceValid = (): boolean => +price > 0;

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

EditProductScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam('productTitle');
  const headerTitle = navData.navigation.getParam('productId')
    ? productTitle
    : 'Add Product';

  const submitFn = navData.navigation.getParam('submit');
  const isFormValid = navData.navigation.getParam('isFormValid');

  return {
    headerTitle,
    headerRight: () => (
      <DefaultHeaderButtons
        navData={navData}
        title="Save"
        iconName="ios-checkmark"
        iconNameAndroid="md-checkmark"
        onPress={submitFn}
        disabled={!isFormValid}
      />
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
