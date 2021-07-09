import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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

interface SearchBarProps {
  onPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Artist.."
        placeholderTextColor="grey"
        style={styles.textInput}
      />
      <TouchableWithoutFeedback onPress={onPress}>
        <MaterialIcons name="sort" size={26} style={{ marginHorizontal: 7 }} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SearchBar;
