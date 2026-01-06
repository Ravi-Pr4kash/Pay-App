
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignupPage } from './Pages/SignupPage'
import { SigninPage } from './Pages/SigninPage'
import { DashboardPage } from './Pages/DashboardPage'
import { Send } from './Pages/Send'
import { PublicRoute } from './components/PublicRoute'
import { UpdatePage } from './Pages/UpdatePage'
import { Toaster } from 'sonner'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute><SignupPage /></PublicRoute>} />
          <Route path='/signup' element={<PublicRoute> <SignupPage/> </PublicRoute>}/>
          <Route path='/signin' element={<PublicRoute> <SigninPage/> </PublicRoute>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/update' element={<UpdatePage/>}/>
          <Route path='/send' element={ <Send/> }/>
        </Routes>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
