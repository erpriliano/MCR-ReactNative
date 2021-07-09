import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  children?: JSX.Element;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    padding: 5,
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1dcb34',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.5,
  },
});

const Button: React.FC<ButtonProps> = ({ onPress, title, children }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.buttonWrapper}>
          {children}
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Button;
