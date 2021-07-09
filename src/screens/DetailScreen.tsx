import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/NavigatorType';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../components/Button';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

type DetailNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

type DetailScreenProps = {
  route: DetailRouteProp;
  navigation: DetailNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 320,
  },
  icon: {
    marginRight: 7,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 18,
  },
  text1: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 18,
  },
  labelText: {
    textAlign: 'center',
    fontSize: 16,
  },
  horizontalWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  horizontalSpaceWrapper: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  labelWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 10,
    justifyContent: 'center',
  },
});

const ICON_SIZE = 24;

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { entry } = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <SharedElement id={entry.id.attributes['im:id']}>
          <Image
            resizeMode="contain"
            source={{ uri: entry['im:image'][2].label }}
            style={styles.image}
          />
        </SharedElement>

        <Button
          title="Preview"
          onPress={() => {
            Linking.openURL(entry.link.attributes.href);
          }}>
          <MaterialIcons
            name="play-arrow"
            size={ICON_SIZE}
            color="white"
            style={styles.icon}
          />
        </Button>

        <View style={styles.contentWrapper}>
          <Text style={styles.text1}>{entry['im:artist'].label}</Text>
          <View style={styles.horizontalWrapper}>
            <MaterialIcons name="event" size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.text2}>
              {entry['im:releaseDate'].attributes.label}
            </Text>
          </View>
          <Text style={styles.text2}>{entry.title.label}</Text>
          <View style={styles.horizontalWrapper}>
            <MaterialIcons name="album" size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.text2}>{entry.category.attributes.label}</Text>
          </View>

          <View style={styles.horizontalSpaceWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="local-offer"
                size={ICON_SIZE}
                style={styles.icon}
              />
              <Text style={styles.text2}>{entry['im:price'].label}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons
                name="inventory"
                size={ICON_SIZE}
                style={styles.icon}
              />
              <Text style={styles.text2}>
                {entry['im:itemCount'].label} aval.
              </Text>
            </View>
          </View>

          <View style={styles.labelWrapper}>
            <Text style={styles.labelText}>{entry.rights.label}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailScreen;
