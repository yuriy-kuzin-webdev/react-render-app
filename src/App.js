import { useState } from 'react';
import './App.css';
import Game from './components/Game/Game';
import Entry from './components/Entry/Entry';
import List from './components/List/List';

function App() {
  const [nickname,setNickname] = useState('')
  const [score, setScore] = useState('')
  const [isShowGame, setIsShowGame] = useState(false)
  const [isShowEntry, setIsShowEntry] = useState(true)
  const [isShowLeaders, setIsShowLeaders] = useState(false)
  const [isShowScore, setIsShowScore] = useState(false)

  const handleEndGame = (gameScore) => {
    handlePostRequest()
    setIsShowGame(function(prev){return false})
    setScore(function(prev){return gameScore})
    setIsShowScore(function(prev){return true})
  }
  const handlePostRequest = () => {
    const body = {nickname, score}
    try{
      fetch('https://yuriy-kuzin-snake-app.onrender.com/leaders',{
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)
      })
    }catch(err){
      console.log("Error : ",err)
    }
  }
  const handleShowLeaders = () => {
    setIsShowEntry(function(prev){return false})
    setIsShowLeaders(function(prev){return true})
  }
  const handleStartGame = (nickname) => {
    if(nickname.length > 0 && nickname !== ' ' && nickname.length <= 30){
      setNickname(function(prev){return nickname})
      setIsShowEntry(function(prev){return false})
      setIsShowGame(function(prev){return true})
    }
  }
  const handleShowMenu = () => {
    setIsShowScore(function(prev){return false})
    setIsShowLeaders(function(prev){return false})
    setIsShowEntry(function(prev){return true})
  }
  return (
    <div className="App">
      {isShowEntry && <Entry startGameHandler={handleStartGame} showLeadersHandler={handleShowLeaders} name={nickname}/>}
      {isShowGame && <Game endGameCallBack={handleEndGame} nickname={nickname}/>}
      {isShowScore && (<div className='score'><span>{`${nickname} your score is : ${score}`}</span><button onClick={handleShowMenu}>Return to menu</button></div>)}
      {isShowLeaders && <List handleMenuClick={handleShowMenu}/>}
    </div>
  );
}

export default App;
