import { useRequestStore } from "../../stores/requestsStore";
import "./LogWindow.scss";

const LogWindow: React.FC = () => {
    const { loadingGpt, answerResult, aiAnswer } = useRequestStore();
    return (
        <section className="log-window">
            {loadingGpt ? (
                <p className="log-window__empty">AI is thinking, please wait...</p>
            ) : answerResult ? (
                <div className="log-window__content">
                    <p className="log-window__text">{answerResult}</p>
                    {aiAnswer && (
                        <audio
                            className="log-window__audio"
                            controls
                            src={URL.createObjectURL(aiAnswer)}
                        />
                    )}
                </div>
            ) : null}
        </section>
    );
};
export default LogWindow;
