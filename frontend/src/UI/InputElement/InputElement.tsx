

import "./InputElement.scss";

type PropsInputElement = {
    inputType: "text" | "number" | "password" | "email";
    placeholder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | boolean;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    label?: string;
    autoComplete?: string;
    size?: string;
    first?: boolean;
    className?: string;
    inputWidth?: string;
    defaultValue?: string | number | boolean;
    errorMessage?: string;
    onAnimationStart?: (e: React.AnimationEvent<HTMLInputElement>) => void;
};
const InputElement: React.FC<PropsInputElement> = ({
    inputType,
    placeholder,
    name,
    onChange,
    onInput,
    value,
    label,
    autoComplete,
    first,
    className,
    inputWidth,
    size,
    defaultValue,
    errorMessage,
}) => {
    return (
        <div className={`input-element ${className ? className : size}`}>
            {label && (
                <label className={`input-element__label ${size} ${first && "first"}`}>
                    {label}
                </label>
            )}
            <input
                className={`input-element__input ${className ? className : size} ${inputWidth ? "custom-width" : ""}`}
                type={inputType}
                name={name && name}
                onInput={onInput && onInput}
                placeholder={placeholder && placeholder}
                onChange={onChange && onChange}
                autoComplete={autoComplete && autoComplete}
                defaultValue={
                    typeof defaultValue === "string" || typeof defaultValue === "number"
                        ? defaultValue
                        : undefined
                }
                style={
                    {
                        ...(inputWidth && { "--input-width": inputWidth }),
                    } as React.CSSProperties
                }
                value={value !== false ? (value as string | number | undefined) : undefined}
            />
            {errorMessage && (
                <span className="input-element__error-message">
                    <span className="input-element__error-message_icon" />
                    <p className="error-message">{errorMessage}</p>
                </span>
            )}
        </div>
    );
};
export default InputElement;
