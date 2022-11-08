import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = ({name, value}) => (<div>{name}: {value}</div>)

const Statistics = ({ title, data: { good, neutral, bad } }) => {

  const total = good + bad + neutral;
  let average = good > 0 || bad > 0 ? (good - bad) / total : 0;
  let positive = good > 0 ? ((good *100)/total).toFixed(1) + " %": "0 %";
  average = average.toFixed(1)
  

  if (title === 0){
    return(
      <>
  <h1>{title}</h1>
  <br/>
  <h2>No Feedbacks yet</h2>
      </>
      )
  }
  return(
    <>
<h1>{title}</h1>
<StatisticLine name="Good" value={good}/>
<StatisticLine name="bad" value={bad}/>
<StatisticLine name="neutral" value={neutral}/>
<StatisticLine name="total" value={total}/>
<StatisticLine name="average" value={average}/>
<StatisticLine name="positive" value={positive}/>

    </>
    
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = bad + neutral + good;

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text="good" handleClick={()=> setGood(good + 1)}/>
      <Button text="neutral" handleClick={()=> setNeutral(neutral + 1)}/>
      <Button text="Bad" handleClick={()=> setBad(bad + 1)}/>
      <Statistics title="Statistics" data={{good, bad, neutral}}/> 
    </>
    
  )
}

export default App