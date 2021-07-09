import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigatorType';
import { Entry } from '../types/Type';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';

type ListRouteProp = RouteProp<RootStackParamList, 'List'>;

type ListNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type ListScreenProps = {
  route: ListRouteProp;
  navigation: ListNavigationProp;
};

const ListScreen: React.FC<ListScreenProps> = ({ navigation }) => {
  const [results, setResults] = useState<Entry[]>([]);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(response => setResults(response.feed.entry))
      .catch(err => console.log(err));
  }, []);

  return (
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
      ListHeaderComponent={<SearchBar />}
      stickyHeaderIndices={[0]}
    />
  );
};

export default ListScreen;
