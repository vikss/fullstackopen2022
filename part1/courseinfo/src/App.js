const App = () => {
  const course = {
    name: 'Half Stack application development', parts: [
      { name: 'Fundamentals of React', exercises: 10 },
      { name: 'Using props to pass data', exercises: 7 },
      { name: 'State of a component', exercises: 14 }]
  }



  return (
    <div>
      <Header course={course} />
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  )
}

const Header = ({course}) => {


  return (<h1>{course.name}</h1>)

}
const Content = (props) => {
  let parts = props.course.parts;
  return (<div><Part part={parts[0].name} exercise={parts[0].exercises}></Part>
    <Part part={parts[1].name} exercise={parts[1].exercises}></Part>
    <Part part={parts[2].name} exercise={parts[2].exercises}></Part></div>)

}
const Part = (props) => {
  return (<p>{props.part} {props.exercise}</p>)
}
const Total = ({ course}) => {
  let total = 0;
  for (let i = 0; i < course.parts.length; i++) {
    total += course.parts[i].exercises;

  }
  return (<p>Number of exercises {total}</p>)

}

export default App