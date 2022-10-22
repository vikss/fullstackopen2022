import { useState } from "react";


const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + bad + neutral;
  const average = all > 0 ? (good * 1 + neutral * 0 + bad * -1) / all : 0;
  const per = all > 0 ? good / all * 100 : 0;

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)}></Button>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text="bad" handleClick={() => setBad(bad + 1)}></Button>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} per={per}></Statistics>



    </div>
  );
}
const Statistics = (props) => {

  if (props.good + props.bad + props.neutral == 0)
    return (<div>No feedback given</div>)

  return (<table><tbody><StatisticLine text="good" count={props.good} />
    <StatisticLine text="neutral" count={props.neutral} />
    <StatisticLine text="bad" count={props.bad} />
    <StatisticLine text="all" count={props.good + props.neutral + props.bad}></StatisticLine>

    <StatisticLine text="average" count={props.average}></StatisticLine>
    <StatisticLine text="positive" count={props.per + ' %'}></StatisticLine></tbody></table>)
}
const StatisticLine = (props) => {
  return (<tr><td>{props.text}</td><td> {props.count}</td></tr>);

}

const Button = (props) => {

  return (<button onClick={props.handleClick}>{props.text}</button>)

}

export default App;
