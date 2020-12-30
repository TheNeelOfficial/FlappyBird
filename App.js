import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [ birdBottom, setBirdBottom ] = useState(screenHeight / 2)

  const gravity = 3

  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300

  const gap = 50

  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)

  let gameTimerId
  let obstaclesLeftTimerId
  let obstaclesTimerIdTwo

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


  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score +1)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Bird 
        birdBottom={birdBottom}
        birdLeft={birdLeft}
      />
      <Obstacles 
        color={'green'}
        obstacleWidth = {obstacleWidth}
        obstacleHeight = {obstacleHeight}
        randomBottom = {obstaclesNegHeightTwo}
        gap = {gap}
        obstaclesLeft = {obstaclesLeftTwo}
      />       
      <Obstacles 
        color={'yellow'}
        obstacleWidth = {obstacleWidth}
        obstacleHeight = {obstacleHeight}
        randomBottom = {obstaclesNegHeightTwo}
        gap = {gap}
        obstaclesLeft = {obstaclesLeftTwo}
      />    
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
});
