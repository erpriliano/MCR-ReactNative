import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 65,
    backgroundColor: 'white',
    padding: 10,
  },
  textInput: {
    borderRadius: 10,
    flex: 1,
    fontSize: 18,
    letterSpacing: 0.5,
    paddingHorizontal: 15,
    borderColor: '#bcbcbc',
    borderWidth: 1,
  },
});

const SearchBar: React.FC<{}> = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Artist.."
        placeholderTextColor="grey"
        style={styles.textInput}
      />
    </View>
  );
};

export default SearchBar;
