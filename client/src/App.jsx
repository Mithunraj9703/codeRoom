import EditorPage from "./component/EditorPage"
import Home from "./component/Home"
import {Routes, Route} from 'react-router-dom'
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/editor/:roomId" element={<EditorPage/>} />
        
      </Routes>
    </>
  )
  
}

export default App
