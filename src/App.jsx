import QuestionsList from "./components/mainPage";
import { Routes, Route} from "react-router-dom";
import Detail from "./components/detail";
import Ask from "./components/ask";
import Edit from "./components/edit"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/detail/:qid" element={<Detail/>}>
        </Route>
        <Route path="/" element={<QuestionsList/>}>
        </Route>
        <Route path="/ask" element={<Ask/>}>
        </Route>
        <Route path="/posts/:qid/edit" element={<Edit/>}>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
