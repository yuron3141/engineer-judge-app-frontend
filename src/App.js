import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import {Header} from "./components/Header";
import {Home} from "./pages/home";
import {Result} from "./pages/result";
import {Static} from "./pages/static";
import {Type} from "./pages/type";
import {Info} from "./pages/info";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/result" element={<Result />} />
          <Route path="/type" element={<Type />} />
          <Route path="/static" element={<Static />} />
          <Route path="/info" element={<Info />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
