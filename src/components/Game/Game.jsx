import React, { useState, useEffect, useRef } from 'react';
import Feed from './Feed/Feed';
import classes from './Game.module.css'
import Snake from './Snake/Snake'

function Game({endGameCallBack, nickname}) {

  const DIRECTION_TOP = 'ArrowUp'
  const DIRECTION_DOWN = 'ArrowDown'
  const DIRECTION_LEFT = 'ArrowLeft'
  const DIRECTION_RIGHT = 'ArrowRight'
  const BASE_SPEED = 200
  const SCORE_REQ = 50
  const SPEED_DECREASE = 50
  const PAUSE = 'Space'
  const ENDGAME = 'Escape'
  const POINTS = [1,5,10]

  const handleKeyDown = (keyboardEvent) => {
    switch(keyboardEvent.code){
      case DIRECTION_TOP: direction !== DIRECTION_DOWN && setDirection(function(prevDirection){ return DIRECTION_TOP})
      break
      case DIRECTION_DOWN: direction !== DIRECTION_TOP && setDirection(function(prevDirection){ return DIRECTION_DOWN})
      break
      case DIRECTION_LEFT: direction !== DIRECTION_RIGHT && setDirection(function(prevDirection){ return DIRECTION_LEFT})
      break
      case DIRECTION_RIGHT: direction !== DIRECTION_LEFT && setDirection(function(prevDirection){ return DIRECTION_RIGHT})
      break
      case PAUSE: handlePause()
      break
      case ENDGAME: handleEndGame()
      break
      default: break
    }
  }

  const getRandomFeed = () => {
    const min = 1
    const max = 98
    const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2
    return {
      feedType: Math.floor(Math.random() * 3) + 1,
      position: [x,y]
    }
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
  
  const [direction, setDirection] = useState(DIRECTION_TOP)
  const [speed, setSpeed] = useState(BASE_SPEED)
  const [scoreReq, setScoreReq] = useState(SCORE_REQ)
  const [path, setPath] = useState([[50,52],[50,50],[50,48]])
  const [feed, setFeed] = useState(getRandomFeed())
  const [score, setScore] = useState(0)
  const [isGameOver,setIsGameOver] = useState(false)
  const [isGamePaused,setIsGamePaused] = useState(false)

  const moveSnake = () => {
    setPath(function(prevPath){
        const newPath = prevPath.map(arr => [...arr])
        newPath.shift()
        const head = newPath[newPath.length - 1]
        switch(direction){
        case DIRECTION_TOP: newPath.push([head[0],head[1] - 2])
        break
        case DIRECTION_DOWN: newPath.push([head[0],head[1] + 2])
        break
        case DIRECTION_LEFT: newPath.push([head[0] - 2,head[1]])
        break
        case DIRECTION_RIGHT: newPath.push([head[0] + 2,head[1]])
        break
        default: break
      }
      return newPath
    })
  }

  const isOutOfArea = () => {
    const head = path[path.length - 1]
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      handleEndGame()
    }
  }

  const isCollapsed = () => {
    const body = path.map(arr => [...arr])
    const head = body.pop()
    body.forEach(pos => {
      if(head[0] === pos[0] && head[1] === pos[1]) {
        handleEndGame()
      }
    })
  }

  const isFeedEated = () => {
     const head = path[path.length - 1]
     if (head[0] === feed.position[0] && head[1] === feed.position[1]){
      handleEatenFeed()
      setFeed(getRandomFeed())
     }
  }
  
  const isSpeedToLow = () => {
    if(score >= scoreReq && speed > SPEED_DECREASE){
      setSpeed(function(prevSpeed){
        return prevSpeed -= SPEED_DECREASE
      })
      setScoreReq(function(prevReq){
        return prevReq += SCORE_REQ
      })
    }
  }

  const handleEatenFeed = () => {
    setPath(function(prevPath) {
      let newPath = prevPath.map(arr => [...arr])
      newPath.unshift([])
      return newPath
    })
    setScore(function(prevScore){
      return prevScore + POINTS[feed.feedType - 1]
    })
  }

  const handleUpdate = () => {
    isSpeedToLow()
    isFeedEated()
    isCollapsed()
    isOutOfArea()
    moveSnake()
  }
  const handlePause = () => {
    setIsGamePaused(function(prevStatus){
      return !prevStatus
    })
  }
  const handleEndGame = () => { 
    setIsGameOver(function(prevStatus){
      return !prevStatus
    })
    endGameCallBack(score)

    setDirection(function(prevDirection){ return DIRECTION_TOP})
    setSpeed(function(prevSpeed){return BASE_SPEED})
    setScoreReq(function(prevReq){return SCORE_REQ})
    setPath(function(prev){return [[50,52],[50,50],[50,48]]})
    setFeed(function(prev){return getRandomFeed()})
    setScore(function(prev){return 0})
    setIsGameOver(function(prev){return false})
    setIsGamePaused(function(prev){return false})
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })
  
  useInterval(() => {
    handleUpdate()
  }, !isGamePaused && !isGameOver ? speed : null);
  
  return (
    <div className={classes.container}>
      <div className={classes.nickname}>
        <span>{nickname}</span>
      </div>
      <div className={classes.areaContainer}>
        <div className={classes.area}>
            <Snake path={path}/>
            {feed && <Feed feed={feed}/>}
        </div>
        </div>
      <div className={classes.score}>
        <div>
          <span>{`Speed : ${speed}ms.`}</span>
          <span>{`Score points : ${score}.`}</span>
        </div>
      </div>
    </div>
  )
}

export default Game
