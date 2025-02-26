import { useState } from 'react'

const Head = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text})=> <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value = '-'})=>{
return(
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
)
}

const Statistics = ({good,neutral, bad})=>{
  const all = good + neutral + bad
  const average = all === 0 ? 0 : ((good-bad)/all).toFixed(2)
  const positive = all === 0 ? '0 %' : `${((good/all)*100).toFixed(2)} %`
  if (all===0) {
    return(
      <>
      <Head text='Statistics' />
      <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <Head text='Statistics'/>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = ()=> setGood(good + 1)
  const handleNeutralClick = ()=> setNeutral(neutral + 1)
  const handleBadClick = ()=> setBad(bad + 1)
  
  return (
    <div>
      <Head text='Give feedback' />
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App