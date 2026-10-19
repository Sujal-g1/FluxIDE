
import { login } from './features/login'
import { auth, googleProvider } from './firebase'
import { signInWithPopup } from 'firebase/auth'

const App = () => {


  const handleLogin = async () =>{
    const result = await signInWithPopup(auth, googleProvider)
    // console.log(result) 
    const token = await result.user.getIdToken()
    const data = await login(token)
    console.log(data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
     <button 
     onClick={handleLogin}
     className='bg-amber-300 p-2 rounded-lg'>continue with google</button>
    </div>
  )
}

export default App