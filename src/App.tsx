import AppRoutes from "./routes";
import Spinner from "./components/Spinner";

function App() {
    return (
        <div className="App">
            <Spinner />
            <AppRoutes />
        </div>
    );
}

export default App;
