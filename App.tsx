/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  ScrollView,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Card from './src/components/Card';
// import {
//   SharedElement,
//   SharedElementTransition,
//   nodeFromRef,
// } from 'react-native-shared-element';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=200/json')
      .then(response => response.json())
      .then(response => setResults(response.feed.entry))
      .catch(err => console.log(err));
  }, []);

  // let startAncestor = null;
  // let startNode = null;
  // let endAncestor = null;
  // let endNode = null;

  // const position = new Animated.Value(0);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {results.map((result, index) => {
          return (
            <Card
              key={index}
              imgUri={result['im:image'][2].label}
              artist={result['im:artist'].label}
              title={result.title.label}
              price={result['im:price'].label}
              stock={result['im:itemCount'].label}
            />
          );
        })}
      </ScrollView>
      {/* <View ref={ref => (startAncestor = nodeFromRef(ref))}>
        <SharedElement onNode={node => (startNode = node)}>
          <Image
            style={{ height: 250, width: 250 }}
            source={{
              uri: 'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/7c/91/d3/7c91d3c6-2591-1b94-1f52-46b9e2f39c80/21BMR0002592.rgb.jpg/55x55bb.png',
            }}
          />
        </SharedElement>
        <Text>Yaaa</Text>
        <Text>Apa boleh buat</Text>
      </View>
      <View ref={ref => (endAncestor = nodeFromRef(ref))}>
        <SharedElement onNode={node => (endNode = node)}>
          <Image
            style={{ height: 250, width: 250 }}
            source={{
              uri: 'https://is5-ssl.mzstatic.com/image/thumb/Music115/v4/7c/91/d3/7c91d3c6-2591-1b94-1f52-46b9e2f39c80/21BMR0002592.rgb.jpg/55x55bb.png',
            }}
          />
        </SharedElement>
        <Text>Coba dulu</Text>
      </View>
      <View style={StyleSheet.absoluteFill}>
        <SharedElementTransition
          start={{ node: startNode, ancestor: startAncestor }}
          end={{ node: endNode, ancestor: endAncestor }}
          position={position}
          animation="move"
          resize="auto"
          align="auto"
        />
      </View> */}
    </SafeAreaView>
  );
};

export default App;
