import React from "react"
import Die from "./Die"
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti'



export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld) 
    const firstvalue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstvalue)
    if (allHeld && allSameValue){
      setTenzies(true)
    }

  }, [dice])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id:uuidv4()
    }
}

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(
          generateNewDie()
        )
    }
    return newDice
}
function holdDice(id) {
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
}))
  
}
const diceElement = dice.map(die => <Die key = {die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

function rolldice(){
  if(!tenzies){
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
          die :
          generateNewDie()
  }))

  } else{
    setTenzies(false)
    setDice(allNewDice())
    setRollnum(0)
  }

  
}
const [rollnum, setRollnum] = React.useState(0)
React.useEffect(()=>{
  rolldice()

  

  console.log(rollnum)

}, [rollnum]);

    return (
        <main>
          {tenzies && <Confetti />}
                      <h1 className="title">Tenzies</h1>
                      <div className="time"></div>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
              {diceElement}
            </div>
            <button className="roll-dice" onClick={rolldice => setRollnum(oldnum => oldnum + 1)}>{tenzies ? "New Game" : "Roll"}</button>
            {tenzies && <h3 className="rollnumber">No of Rolls: {tenzies && rollnum } </h3>}
        </main>
    )
    }