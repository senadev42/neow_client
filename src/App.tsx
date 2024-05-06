import Header from "./components/Header";
import NEOTable from "./components/NEOTable";

function App() {
  return (
    <div className="flex flex-col items-center py-5">
      <Header />
      <main className="p-4">
        <NEOTable />
      </main>
    </div>
  );
}

export default App;
