import "./MainForm.scss";
import { useFormStore } from "full-form-control";
import InputElement from "../../UI/InputElement/InputElement";
import { formSchema } from "../../utils/validateForm";
import AudioRecorder from "../../UI/AudioRecorder/AudioRecorder";
import { useRequestStore } from "../../stores/requestsStore";

const MainForm: React.FC = () => {
    const { formValues, setFormValues, errors, isValid, unsubscribeFromStore } = useFormStore();
    const { sendRequest } = useRequestStore();

    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: formSchema });
    };

    const handleSendRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const { userRequest, userName, audioRequest } = formValues;
            if ((!userRequest || userRequest.trim() === "") && !audioRequest) {
                throw new Error("You must provide either a text request or an audio request");
            }

            const response = await sendRequest(userName, userRequest || "", audioRequest, false);
            console.log("Request sent successfully:", response);
            unsubscribeFromStore();
        } catch (error: Error | any) {
            console.error(error);
        }
    };
    return (
        <form className="main-form" onSubmit={handleSendRequest}>
            <div className="main-form__request-input">
                {!formValues.audioRequest && (
                    <InputElement
                        inputType="text"
                        placeholder="Enter your request"
                        name="userRequest"
                        onChange={(e) => setInputData("userRequest", e.target.value)}
                        value={formValues.userRequest || ""}
                        label="User Request"
                        errorMessage={errors.userRequest}
                        autoComplete="off"
                        className="main-form__input"
                    />
                )}
                <AudioRecorder
                    isAudioRequest={!!formValues.audioRequest}
                    onRecordComplete={(file: Blob) => setInputData("audioRequest", file)}
                />
            </div>

            <InputElement
                inputType="text"
                placeholder="Enter your name"
                name="userName"
                onChange={(e) => setInputData("userName", e.target.value)}
                value={formValues.userName || ""}
                label="Name"
                errorMessage={errors.userName}
                autoComplete="off"
                className="main-form__input"
            />
            <button
                type="submit"
                className={`main-form__button ${!isValid ? "disabled" : ""}`}
                disabled={!isValid}
            >
                Ask me!
            </button>
        </form>
    );
};
export default MainForm;
