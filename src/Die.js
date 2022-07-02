import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className="die-face" style={styles}
        onClick={props.holdDice}>
            {/* <span className="dots"></span>
            <span className="dots1"></span>
            <span className="dots2"></span>
          <span className="dots3"></span>
          <span className="dots4"></span>
          <span className="dots5"></span> */}



            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}