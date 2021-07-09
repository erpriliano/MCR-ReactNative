import React from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

interface CardProps {
  onPress: () => void;
  id: string;
  imgUri: string;
  artist: string;
  title: string;
  price: string;
  stock: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 7,
    margin: 10,
  },
  cardWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 20,
  },
  image: {
    height: 280,
  },
  content: {
    paddingBottom: 15,
    paddingHorizontal: 8,
  },
  text1: {
    marginVertical: 7,
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 7,
  },
  text2: {
    paddingHorizontal: 7,
    fontSize: 18,
    marginBottom: 7,
  },
  text3: {
    fontSize: 18,
  },
  subDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 7,
  },
});

const Card: React.FC<CardProps> = ({
  onPress,
  id,
  imgUri,
  artist,
  title,
  price,
  stock,
}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.cardWrapper}>
          <SharedElement id={id}>
            <Image
              resizeMode="cover"
              source={{
                uri: imgUri,
              }}
              style={styles.image}
            />
          </SharedElement>
          <View style={styles.content}>
            <Text numberOfLines={2} style={styles.text1}>
              {artist}
            </Text>
            <Text numberOfLines={1} style={styles.text2}>
              {title}
            </Text>
            <View style={styles.subDetail}>
              <Text style={styles.text3}>{price}</Text>
              <Text style={styles.text3}>Stock: {stock}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
