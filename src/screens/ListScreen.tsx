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
    value: 'im:price.attributes.amount',
  },
  {
    id: '2',
    label: 'Sort by artist',
    value: 'im:artist.label',
  },
  {
    id: '3',
    label: 'Sort by release date',
    value: 'im:releaseDate.label',
  },
];

const radioButtonsSort: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Ascending',
    value: '-1',
  },
  {
    id: '2',
    label: 'Descending',
    value: '1',
  },
];

const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const [results, setResults] = useState<{
    allEntries: Entry[];
    filteredEntries: Entry[];
  }>({
    allEntries: [],
    filteredEntries: [],
  });
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(radioButtonsData);
  const [sortSettings, setSortSettings] =
    useState<RadioButtonProps[]>(radioButtonsSort);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(response =>
        setResults({
          allEntries: response.feed.entry,
          filteredEntries: response.feed.entry,
        }),
      )
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={results.filteredEntries}
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
          <SearchBar
            onPress={() => setIsShowModal(!isShowModal)}
            handleTextChange={text => {
              // Reset filtered entries wih all entries if no search terms exist
              if (text.length === 0) {
                setResults({
                  ...results,
                  filteredEntries: results.allEntries,
                });
              }
              // Might as well use debounce/throttle here.
              const loweredCaseText = text.toLowerCase();
              const filteredEntries = results.allEntries.filter(entry => {
                return (
                  entry['im:artist'].label
                    .toLowerCase()
                    .includes(loweredCaseText) ||
                  entry['im:contentType'].attributes.label
                    .toLowerCase()
                    .includes(loweredCaseText) ||
                  entry['im:name'].label
                    .toLowerCase()
                    .includes(loweredCaseText) ||
                  entry.title.label.toLowerCase().includes(loweredCaseText)
                );
              });

              // Should set NO_RESULT state, and UI should act accordingly
              if (filteredEntries.length === 0) {
              }

              setResults({
                ...results,
                filteredEntries,
              });
            }}
          />
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
          <Button
            onPress={() => {
              const selectedSort = radioButtons.find(
                radioButton => radioButton.selected,
              );
              const selectedSortSetting = sortSettings.find(
                sortSetting => sortSetting.selected,
              );
              const notSelectedSortSetting = sortSettings.find(
                sortSetting => !sortSetting.selected,
              );

              if (selectedSort) {
                const filteredEntries = results.filteredEntries.sort((a, b) => {
                  const aValue = selectedSort.value
                    .split('.')
                    .reduce(function (p, prop) {
                      return prop === 'amount' ? parseInt(p[prop]) : p[prop];
                    }, a);
                  const bValue = selectedSort.value
                    .split('.')
                    .reduce(function (p, prop) {
                      return prop === 'amount' ? parseInt(p[prop]) : p[prop];
                    }, b);

                  if (aValue < bValue) {
                    return parseInt(selectedSortSetting?.value);
                  } else if (bValue < aValue) {
                    return parseInt(notSelectedSortSetting?.value);
                  } else {
                    return 0;
                  }
                });

                const allEntries = results.allEntries.sort((a, b) => {
                  const aValue = selectedSort.value
                    .split('.')
                    .reduce(function (p, prop) {
                      return prop === 'amount' ? parseInt(p[prop]) : p[prop];
                    }, a);
                  const bValue = selectedSort.value
                    .split('.')
                    .reduce(function (p, prop) {
                      return prop === 'amount' ? parseInt(p[prop]) : p[prop];
                    }, b);

                  if (aValue < bValue) {
                    return parseInt(selectedSortSetting?.value);
                  } else if (bValue < aValue) {
                    return parseInt(notSelectedSortSetting?.value);
                  } else {
                    return 0;
                  }
                });

                setResults({
                  allEntries,
                  filteredEntries,
                });
              }

              setIsShowModal(false);
            }}
            title="Sort"
          />
        </View>
      </Modal>
    </>
  );
};

export default ListScreen;
