import React from 'react';
import {Route, Routes} from "react-router-dom";
import {useAuth} from "./firebase";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import SignUp from "./pages/Login/SignUp";
import SignIn from "./pages/Login/SignIn";
import Chat from "./pages/Chat/Chat";
import Products from "./pages/Products/Products";
import Profile from "./pages/Profile/Profile";
import TodoList from "./pages/TodoList/TodoList";
import Countries from "./pages/Countries/Countries";
import LoginRoute from "./components/Routes/LoginRoute";
import NoLoginRoute from "./components/Routes/NoLoginRoute";
import BackdropComponent from "./components/Backdrop/BackdropComponent";

function App() {
  const user = useAuth();
  console.log(user);
  return (
    <div className="App">
      <BackdropComponent term={user === undefined}/>
      <Header/>
      <Routes>
        <Route path='/' element={
          <NoLoginRoute user={user}>
            <SignIn/>
          </NoLoginRoute>
        }/>
        <Route path='/signUp' element={
          <NoLoginRoute user={user}>
            <SignUp/>
          </NoLoginRoute>
        }/>
        <Route
          path='/home'
          element={
            <LoginRoute user={user}>
              <Home/>
            </LoginRoute>
          }/>
        <Route
          path='/products'
          element={
            <LoginRoute user={user}>
              <Products/>
            </LoginRoute>
          }/>
        <Route
          path='/countries'
          element={
            <LoginRoute user={user}>
              <Countries/>
            </LoginRoute>
          }/>
        <Route
          path='/chat'
          element={
            <LoginRoute user={user}>
              <Chat/>
            </LoginRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <LoginRoute user={user}>
              <Profile/>
            </LoginRoute>
          }
        />
        <Route
          path='/todolist'
          element={
            <LoginRoute user={user}>
              <TodoList/>
            </LoginRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
