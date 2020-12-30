import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {

  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height

  const birdLeft = screenWidth / 2
  const [ birdBottom, setBirdBottom ] = useState(screenHeight / 2)

  const gravity = 3

  const [obstaclesLeftOne, setObstaclesLeftOne]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth / 2 + 30)
  const [obstaclesNegHeightOne, setObstaclesNegHeightOne]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const obstacleWidth = 60
  const obstacleHeight = 300

  const gap = 200

  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)

  let gameTimerId
  let obstaclesTimerIdOne
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



  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }


  //start first obstacle
  useEffect(() => {
    if (obstaclesLeftOne > -60) {
      obstaclesTimerIdOne = setInterval(() => {
        setObstaclesLeftOne(obstaclesLeftOne => obstaclesLeftOne - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdOne)
        }
      } else {
          setScore(score => score +1)
          setObstaclesLeftOne(screenWidth)
          setObstaclesNegHeightOne( - Math.random() * 100)
        }
  }, [obstaclesLeftOne])

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


  //check for collisions
  useEffect(() => {
    if (
      ((birdBottom < (obstaclesNegHeightOne + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightOne + obstacleHeight + gap -30)) &&
      (obstaclesLeftOne > screenWidth/2 -30 && obstaclesLeftOne < screenWidth/2 + 30 )
      )
      || 
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
      )
      ) 
      {
        gameOver()
      }
  })
  
  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerIdOne)
    clearInterval(obstaclesTimerIdTwo)
    setIsGameOver(true)      
  }


  return (
    <TouchableWithoutFeedback onPress={jump}>
      <LinearGradient colors={['#96E2FE', '#63D0FF']} style={styles.container}>
        <StatusBar style="auto" />
        {isGameOver && <Text style={{ fontSize: 24, marginLeft: 30, marginTop: 50,   zIndex: 3, elevation: 3 }}>{score}</Text>}
        <Bird 
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles 
          color={'green'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightOne}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftOne}
        /> 
        <Obstacles 
          color={'yellow'}
          obstacleWidth = {obstacleWidth}
          obstacleHeight = {obstacleHeight}
          randomBottom = {obstaclesNegHeightTwo}
          gap = {gap}
          obstaclesLeft = {obstaclesLeftTwo}
        />            
      </LinearGradient>
    </TouchableWithoutFeedback>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63D0FF'
  },
});
