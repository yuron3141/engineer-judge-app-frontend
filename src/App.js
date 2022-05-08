import React, {useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import {Header} from "./components/Header";
import {Home} from "./pages/home";
import {Result} from "./pages/result";
import {Static} from "./pages/static";
import {Type} from "./pages/type";

function App() {
  const [result, setResult] = useState({
    calced: new Array(4).fill(0), //0:Aパラム,1:Bパラム,2:Cパラム,3:Dパラム
    age: "",
    sex: "",
    month: "",
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home result = {result} setResult = {setResult}/>} />
          <Route path="/result" element={<Result result = {result} setResult = {setResult}/>} />
          <Route path="/type" element={<Type />} />
          <Route path="/static" element={<Static />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
