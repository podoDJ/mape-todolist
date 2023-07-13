import React from 'react'
import TodoList from '../../components/TodoList/TodoList'

const Boss = () => {
  return (
    <div style={{
      marginTop: "100px"
    }}>
    <TodoList todoTypeIs={"Boss"} />

    </div>
  )
}

export default Boss