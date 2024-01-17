import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import SurveyPage from "./pages/SurveyPage";
import QuotePage from "./pages/QoutePage";

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/qoute" element={<QuotePage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
