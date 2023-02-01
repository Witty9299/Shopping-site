import Login from './components/login';
import './App.css';
import Signup from './components/signup';
import{
BrowserRouter,
Routes,
Route,
Navigate,
} from 'react-router-dom';
import Productfeed from './components/Productfeed';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute =(props)=>{
  const token =localStorage.getItem("ecommereAuthtoken");
  const hasLoggedin =token!="";
  if(hasLoggedin)return props.children;
  return <Navigate to="/login"/>
}
const UnProtectedRoute =(props)=>{
  const token =localStorage.getItem("ecommereAuthtoken");
  const hasLoggedin =token!="";
  if(hasLoggedin)return props.children;
  return <Navigate to="/productsfeed"/>
}
function App() {
 
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
      <Route path='/productsfeed'element={
      <ProtectedRoute>
        <Productfeed/>
      </ProtectedRoute>}></Route>
        <Route path='/login'element={<UnProtectedRoute>
          <Login></Login>
        </UnProtectedRoute>}></Route>
        <Route path ='/signup'element={
          <UnProtectedRoute>
            <Signup/>
          </UnProtectedRoute>}></Route>
        <Route path='/referal/:referalid' element={<Signup/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}


export default App;
