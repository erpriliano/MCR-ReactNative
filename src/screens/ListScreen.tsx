import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigatorType';
import { Entry } from '../types/Type';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import Modal from 'react-native-modal';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import Button from '../components/Button';

type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

type ListNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type ListScreenProps = {
  route: ListRouteProp;
  navigation: ListNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  wrapper: {
    maxHeight: 400,
    flex: 1,
    backgroundColor: 'white',
    padding: 25,
  },
  section: {
    marginTop: 10,
  },
  radioGroupWrapper: {
    marginVertical: 10,
  },
  text1: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const radioButtonsData: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Sort by price',
    value: 'sortPrice',
  },
  {
    id: '2',
    label: 'Sort by artist',
    value: 'sortArtist',
  },
  {
    id: '3',
    label: 'Sort by release date',
    value: 'sortDate',
  },
];

const radioButtonsSort: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Ascending',
    value: 'asc',
  },
  {
    id: '2',
    label: 'Descending',
    value: 'desc',
  },
];

const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const [results, setResults] = useState<Entry[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);
  const [sortSettings, setSortSettings] =
    useState<RadioButtonProps[]>(radioButtonsSort);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(response => setResults(response.feed.entry))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={result => result.id.attributes['im:id']}
        renderItem={({ item }) => {
          return (
            <Card
              onPress={() => navigation.navigate('Detail', { entry: item })}
              id={item.id.attributes['im:id']}
              imgUri={item['im:image'][2].label}
              artist={item['im:artist'].label}
              title={item.title.label}
              price={item['im:price'].label}
              stock={item['im:itemCount'].label}
            />
          );
        }}
        ListHeaderComponent={
          <SearchBar onPress={() => setIsShowModal(!isShowModal)} />
        }
        stickyHeaderIndices={[0]}
      />
      <Modal
        style={styles.container}
        isVisible={isShowModal}
        onBackdropPress={() => setIsShowModal(false)}>
        <View style={styles.wrapper}>
          <View style={styles.section}>
            <Text style={styles.text1}>Sort By</Text>
            <View style={styles.radioGroupWrapper}>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={(radioButtonsArray: RadioButtonProps[]) =>
                  setRadioButtons(radioButtonsArray)
                }
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.text1}>Settings</Text>
            <View style={styles.radioGroupWrapper}>
              <RadioGroup
                layout="row"
                radioButtons={sortSettings}
                onPress={(radioButtonsSortArray: RadioButtonProps[]) =>
                  setSortSettings(radioButtonsSortArray)
                }
              />
            </View>
          </View>
          <Button onPress={() => console.log('Pressed')} title="Sort" />
        </View>
      </Modal>
    </>
  );
};

export default ListScreen;
