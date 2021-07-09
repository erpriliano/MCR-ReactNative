import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigatorType';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

type DetailScreenProps = {
  route: DetailRouteProp;
  navigation: DetailNavigationProp;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ route, navigation }) => {
  const { entry } = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1 }}>
        <SharedElement id={entry.id.attributes['im:id']}>
          <Image
            resizeMode="contain"
            source={{ uri: entry['im:image'][2].label }}
            style={{ height: 320 }}
          />
        </SharedElement>

        <View style={{ marginVertical: 15 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Linking.openURL(entry.link.attributes.href);
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 10,
                padding: 5,
                marginHorizontal: 25,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1dcb34',
                borderRadius: 5,
              }}>
              <MaterialIcons
                name="play-arrow"
                size={24}
                color="white"
                style={{ marginRight: 7 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  letterSpacing: 0.5,
                }}>
                Preview
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 18 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {entry['im:artist'].label}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <MaterialIcons name="event" size={20} style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 18 }}>
              {entry['im:releaseDate'].attributes.label}
            </Text>
          </View>
          <Text style={{ fontSize: 18, marginTop: 5 }}>
            {entry.title.label}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons name="album" size={20} style={{ marginRight: 5 }} />
            <Text style={{ fontSize: 18 }}>
              {entry.category.attributes.label}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="local-offer"
                size={20}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 18 }}>{entry['im:price'].label}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="inventory"
                size={20}
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontSize: 18 }}>
                {entry['im:itemCount'].label} aval.
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginTop: 25,
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ textAlign: 'center', fontSize: 16 }}>
              {entry.rights.label}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
