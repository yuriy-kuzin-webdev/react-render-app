import React, { useState } from 'react'
import classes from './Entry.module.css'

function Entry({startGameHandler, showLeadersHandler, name}) {
  const [isShowHelp,setIsShowHelp] = useState(false)
  const [nickname, setNickname] = useState(name)
  const handleNicknameChange = (e) => {
    setNickname(e.target.value)
  }
  const handleShowHelp = () => {
    setIsShowHelp(!isShowHelp)
  }

  return (
    <div className={classes.entry}>
      <div className={classes.form}>
        {!isShowHelp ? (
          <>
            <label htmlFor="">Nickname</label>
            <input type="text" value={nickname} onChange={handleNicknameChange}/>
            <button onClick={() => startGameHandler(nickname)}>Start Game</button>
            <button onClick={showLeadersHandler}>Show Leaders</button>
            <button onClick={() => handleShowHelp()}>Show Help</button>
          </>
        ) : (
          <>
            <span>Use arrows to turn the snake</span>
            <span>Press 'space' to pause/unpause</span>
            <span>Press 'Esc' to end the game</span>
            <span>Earn score by collecting dots</span>
            <span>Yellow - 1 point, Blue - 5 points, Red - 10 points</span>
            <button onClick={handleShowHelp}>Close help</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Entry