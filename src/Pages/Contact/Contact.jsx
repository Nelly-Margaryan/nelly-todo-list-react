import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import FormApi from "../../Api/formApi";
import setLoader from "../../Redux/Reducers/isLoading";
import styles from "./contact.module.css";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const formApi = new FormApi();


function Contact() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const [nameErrorMessage, setNameErrorMessage] = useState(null);
    const [emailErrorMessage, setEmailErrorMessage] = useState(null);
    const [messageErrorMessage, setMessageErrorMessage] = useState(null);
    const dispatch = useDispatch();


    const handleSubmit = async () => {
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const message = messageRef.current.value;
        if (!name) {
            setNameErrorMessage("Name is required!");
        } else {
            setNameErrorMessage(null);
        }

        if (!message) {
            setMessageErrorMessage("Message is required!");
        } else {
            setMessageErrorMessage(null);
        }

        if (!email) {
            setEmailErrorMessage("Email address is required!");
            return;
        }
        setEmailErrorMessage(null);

        if (!emailRegex.test(email)) {
            setEmailErrorMessage("Email address is not valid!");
            return;
        }
        setEmailErrorMessage(null);

        if (nameErrorMessage) {
            return;
        }
        if (messageErrorMessage) {
            return;
        }

        const form = {
            name,
            email,
            message,
        }

        try {
            dispatch(setLoader(true));
            await formApi.sendForm(form);
            toast.success("Thank you for contacting us, the form has been sent!");
            nameRef.current.value = "";
            messageRef.current.value = "";
            emailRef.current.value = "";
        } catch (err) {
            toast.error(err.message);
        } finally {
            dispatch(setLoader(false))
        }

    }
    return (
        <div className={styles.fill}>
            <div>
                <div className={styles.contactPageTitle}>
                    <h2 >
                        Connect With Us
                    </h2>
                    <p><i>Fields marked with * are mandatory fields!</i></p>
                </div>

                <div className={styles.contactForm}>
                    <label htmlFor="name" className={styles.label}>
                        Full name*
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={`${styles.textInput} ${nameErrorMessage ? styles.invalid : ""}`}
                        ref={nameRef}
                    />
                    {nameErrorMessage && (
                        <h6 className={`${styles.errorMessage} mt-2 p-1`}>
                            {nameErrorMessage}
                        </h6>
                    )}
                    <label htmlFor="email" className={styles.label}>
                        Email*
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        className={`${styles.textInput} ${emailErrorMessage ? styles.invalid : ""}`}
                        ref={emailRef}
                    />
                    {emailErrorMessage && (
                        <h6 className={`${styles.errorMessage} mt-2 p-1`}>
                            {emailErrorMessage}
                        </h6>
                    )}
                    <label htmlFor="message" className={styles.label}>
                        Message*
                    </label>
                    <textarea
                        id="message"
                        className={styles.textInput}
                        rows={5}
                        ref={messageRef}
                    />
                    {messageErrorMessage && (
                        <h6 className={`${styles.errorMessage} mt-2 p-1`}>
                            {messageErrorMessage}
                        </h6>
                    )}
                    <Button
                        variant="success"
                        className={styles.submit}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Contact;