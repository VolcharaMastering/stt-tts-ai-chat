import { useRequestStore } from "../../stores/requestsStore";
import "./TranscribedTextField.scss";

const TranscribedTextField: React.FC = () => {
    const { loadingTranscribe, transcribedText } = useRequestStore();
    return (
        <section className="transcribe-block">
            {loadingTranscribe ? (
                <p className="transcribe-block__empty">Transcribe in progress, please whait...</p>
            ) : transcribedText ? (
                <p className="transcribe-block__text">{transcribedText}</p>
            ) : null}
        </section>
    );
};
export default TranscribedTextField;
