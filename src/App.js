import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/" element={<SurveyPage />} />
          <Route path="/" element={<SurveyPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
