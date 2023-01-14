import clsx from "clsx";
import { ModalBody } from "../../components/universal/Modal";
import styles from "./index.module.css";

export const Input: React.FC<{
  label: string;
  value: string;
  type: HTMLInputElement["type"];
  onChange?: (value: string) => void;
  oneLine?: boolean;
}> = ({ label, value, onChange, oneLine, type }) => {
  return (
    <div className={clsx({ [styles.toggleGroup]: oneLine })}>
      <span className={clsx({ [styles.toggleGroupTitle]: oneLine })}>
        <ModalBody>{label}</ModalBody>
      </span>
      <input
        className={styles.passwordInput}
        type={type}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </div>
  );
};

export const Textarea: React.FC<{
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => {
  return (
    <>
      <ModalBody>{label}</ModalBody>
      <textarea
        className={styles.summary}
        name={label}
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
      />
    </>
  );
};