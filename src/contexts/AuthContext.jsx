import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock user data
        const mockUsers = [
          { id: '1', email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
          { id: '2', email: 'user@example.com', password: 'user123', name: 'John Doe', role: 'user' },
        ]
        
        const foundUser = mockUsers.find(u => u.email === email && u.password === password)
        
        if (foundUser) {
          const { password, ...userWithoutPassword } = foundUser
          setUser(userWithoutPassword)
          localStorage.setItem('user', JSON.stringify(userWithoutPassword))
          resolve(userWithoutPassword)
        } else {
          reject(new Error('Invalid credentials'))
        }
      }, 1000)
    })
  }

  const register = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user'
        }
        
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        resolve(newUser)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
