import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';

interface IProps {
  label: string;
}

const TextField: React.FC<IProps> = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.bold,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
  },
});
