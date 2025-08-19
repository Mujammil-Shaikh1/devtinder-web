// import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./component/Main";
import Login from "./component/Login";
import Profile from "./component/Profile";
import { Provider } from "react-redux";
import store from "./utils/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
