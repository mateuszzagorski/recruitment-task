import "./App.css";
import BooksTable from "./components/BooksTable";

function App() {
  const query = "react";
  return (
    <div data-testid="app">
      <BooksTable query={query} />
    </div>
  );
}

export default App;
