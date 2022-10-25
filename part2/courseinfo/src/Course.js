const Course = ({ courses }) => {
    return <div>{courses.map(course => (<div key={course.id}><Header course={course} />
      <Content course={course}></Content>
      <Total course={course}></Total></div>))}</div>
  
  }
  
  const Header = ({ course }) => {
  
  
    return (<h1>{course.name}</h1>)
  
  }
  const Content = (props) => {
    let parts = props.course.parts;
    return (<div>{parts.map(part => <Part key = {part.id} part={part.name} exercise={part.exercises}></Part>)}</div>)
  
  
  }

  const Total = ({ course }) => {

    let parts = course.parts;
  
    let total = parts.reduce((a, part) => a + part.exercises, 0)
  
    return (<p>Number of exercises {total}</p>)
  
  }
  const Part = (props) => {
    return (<p>{props.part} {props.exercise}</p>)
  }
  export default Course;