import "./MainForm.scss";
import { useFormStore } from "full-form-control";
import InputElement from "../../UI/InputElement/InputElement";
import { formSchema } from "../../utils/validateForm";

const MainForm: React.FC = () => {
    const { formValues, setFormValues, errors, isValid, unsubscribeFromStore } = useFormStore();

    const setInputData = async (name: string, value: string | Blob) => {
        setFormValues({ [name]: value }, { type: "zod", schema: formSchema });
    };

    const handleSendRequest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            unsubscribeFromStore();
        } catch (error: Error | any) {
            console.error(error);
            // setError(error?.response?.data?.message as string);
        }
    };
    return (
        <form className="main-form" onSubmit={handleSendRequest}>
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

            <InputElement
                inputType="text"
                placeholder="Enter your name"
                name="username"
                onChange={(e) => setInputData("username", e.target.value)}
                value={formValues.username || ""}
                label="Name"
                errorMessage={errors.username}
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
