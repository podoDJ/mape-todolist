import React, {useState, useContext} from 'react'
// 참고 : https://www.youtube.com/watch?v=2-6K-TMA-nw

// AuthContext은 default값이 null인 새로운 객체를 할당한다. 
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  }
  
  return(
    // 아래 문장의 뜻 : AuthContext.Provider로 감싸지는 애들은 모두 value객체에 접근할 수 있다는 뜻이래.
    <AuthContext.Provider value = {value}>{props.children}</AuthContext.Provider>
  )
}
//이거 만들고 Dashboards.jsx만들러 갔음.