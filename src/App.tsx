// import Navbar from "./component/Navbar";
import { BrowserRouter, Route, Routes } from "react-router";
import Main from "./component/Main";
import Login from "./component/Login";
import { Provider } from "react-redux";
import store from "./utils/store";
import Feed from "./component/Feed";
import Profile from "./component/Profile";
import Connection from "./component/Connection";
import Request from "./component/Request";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/connections" element={<Connection />}></Route>
            <Route path="/requests" element={<Request />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
