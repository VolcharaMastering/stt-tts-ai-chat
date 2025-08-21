import "./App.scss";
import TranscribedTextField from "./components/TranscribedTextField/TranscribedTextField";
import LogWindow from "./components/LogWindow/LogWindow";
import MainForm from "./components/MainForm/MainForm";

function App() {
    return (
        <main className="app">
            <h1 className="main-title">
                TTS/STT chat<sup>TM</sup>
            </h1>
            <MainForm />
            <section className="main-logs">
                <TranscribedTextField />
                <LogWindow />
            </section>
        </main>
    );
}

export default App;
