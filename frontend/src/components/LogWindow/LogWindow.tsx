import { useRequestStore } from "../../stores/requestsStore";
import "./LogWindow.scss";

const LogWindow: React.FC = () => {
    const { chats } = useRequestStore();
    return (
        <section className="log-window">
            <p className="log-window__text">{chats ? JSON.stringify(chats) : ""}</p>
        </section>
    );
};
export default LogWindow;
