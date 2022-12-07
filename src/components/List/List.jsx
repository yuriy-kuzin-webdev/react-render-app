import React, { useEffect, useState } from 'react'
import classes from './List.module.css'

function List({handleMenuClick}) {

  const [leaders,setLeaders] = useState([])

  const getLeaders = async() => {
     try {
      const response = await fetch("https://yuriy-kuzin-snake-app.onrender.com/leaders")
      const jsonData = await response.json()
      setLeaders(function(previous){
        return jsonData.map((leader, index) => {return {index: index + 1, ...leader}} )
      })
     } catch (error) {
      console.log("Error : ", error)
     }
  }
  useEffect(() => {
    getLeaders()
  },[])
  return (
    <div className={classes.container}>
      {leaders.length > 0 && (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Nickame</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map(leader => (
              <tr key={leader.index}>
                <td>{leader.index}</td>
                <td>{leader.nickname}</td>
                <td>{leader.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={handleMenuClick}>Go to menu</button>
    </div>
  )
}

export default List