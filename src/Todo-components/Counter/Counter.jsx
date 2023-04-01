import { memo, useState } from "react";
import Button from 'react-bootstrap/Button';
import styles from "../Counter/counter.module.css"

function Counter() {
  const [counter, setCounter] = useState(0);
  const typenumbers = (num) => {
    if (num > 0) {
      return "Positive"
    } else if (num < 0) {
      return "Negative"
    } else {
      return "Zero"
    }
  }
  return (
    <>
      <div className="m-4 gap-3 d-flex justify-content-align-items">
        <Button
          onClick={() => {
            setCounter(counter - 1)
          }}
          variant="secondary" size="md">
          Counter -
        </Button>

        <h4>{counter}</h4>

        <Button
          onClick={() => {
            setCounter(counter + 1)
          }}
          variant="success" size="md">
          Counter +
        </Button>{' '}

      </div>
      <div className={styles.type}>
        <h5>{typenumbers(counter)}</h5>
      </div>
    </>
  )
}

export default memo(Counter);