import React from 'react';
import { View, Text, Image } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigatorType';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

type DetailScreenProps = {
  route: DetailRouteProp;
  navigation: DetailNavigationProp;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { entry } = route.params;
  return (
    <View>
      <SharedElement id={entry.id.attributes['im:id']}>
        <Image source={{ uri: entry['im:image'][2].label }} />
      </SharedElement>
      <Text>{entry.title.label}</Text>
    </View>
  );
};

export default DetailScreen;
