import { BrowserRouter,Routes,Route,} from "react-router-dom";
import { Apply, EmplyeeList, LateList, PostActivity, PostDetails, Today,Login,Registration } from "./Page/page";
import Header from "./Components/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <Header/>
        <Routes>
          <Route path="/" element={<EmplyeeList />}/>
          <Route path="/today" element={<Today />}/>
          <Route path="/post" element={<PostActivity />}/>
          <Route path="/details" element={<PostDetails />}/>  
          <Route path="/apply" element={<Apply />}/>  
          <Route path="/late" element={<LateList />}/>  
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
