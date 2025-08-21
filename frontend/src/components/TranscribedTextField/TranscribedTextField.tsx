import { useRequestStore } from "../../stores/requestsStore";
import "./TranscribedTextField.scss";

const TranscribedTextField: React.FC = () => {
    const { getAllChats } = useRequestStore();
    const handleGetAllChats = async () => {
        try {
            await getAllChats();
        } catch (error) {
            console.error("Error fetching all chats:", error);
        }
    };
    return (
        <section className="all-chats">
            <button className="all-chats__button" onClick={handleGetAllChats}>
                Get All chats
            </button>

            <p className="all-chats__empty">Press the button to get all chats history</p>
        </section>
    );
};
export default TranscribedTextField;
