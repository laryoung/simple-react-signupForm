import axios from "axios";
import { sessionService } from "redux-react-session";

export const loginUser =
  (values, history, setFieldError, setSubmitting) => (dispatch) => {
    return () => {
      axios
        .post(`${process.env.REACT_APP_BASIC_URI}/user/signin`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((respsonse) => {
          const { data } = respsonse;
          //console.log(data.status);
          if (data.status === "FAILED") {
            const { message } = data;

            if (message.includes("credentials")) {
              setFieldError("email", message);
              setFieldError("password", message);
            } else if (message.includes("password")) {
              setFieldError("password", message);
            }
          } else if (data.status === "SUCCESS") {
            const userData = data.data;
            const token = userData._id;

            sessionService
              .saveSession(token)
              .then(() => {
                sessionService
                  .saveUser(userData)
                  .then(() => {
                    history.push("/dashboard");
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console(err));
          }
          setSubmitting(false);
        })
        .catch((err) => console.log(err));
    };
  };

export const signUp =
  (values, history, setFieldError, setSubmitting) => (dispatch) => {
    return (dispatch) => {
      axios
        .post(`${process.env.REACT_APP_BASIC_URI}/user/signup`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((respsonse) => {
          const { data } = respsonse;
          if (data.status === "FAILED") {
            const { message } = data;
            if (message.includes("name")) {
              setFieldError("name", message);
            } else if (message.includes("email")) {
              setFieldError("email", message);
            } else if (message.includes("date")) {
              setFieldError("dateOfBirth", message);
            } else if (message.includes("password")) {
              setFieldError("password", message);
            }
            setSubmitting(false);
          } else if (data.status === "SUCCESS") {
            const { email, password } = values;
            dispatch(
              loginUser(
                { email, password },
                history,
                setFieldError,
                setSubmitting
              )
            );
          }
        })
        .catch((err) => console.log(err));
    };
  };

export const logOut = (history) => {
  sessionService.deleteSession();
  sessionService.deleteUser();
  history.push("/");
};
