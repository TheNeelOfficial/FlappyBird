import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './components/Bird';

export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [ birdBottom, setBirdBottom ] = useState(screenHeight / 2)

  const gravity = 3

  let gameTimerId

  //start bird falling
  useEffect( () => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)

      return () => {
        clearInterval(gameTimerId)
      }
    }
  }, [birdBottom])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
