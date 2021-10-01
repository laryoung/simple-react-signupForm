import React from "react";
import {
  ButtonGroup,
  colors,
  CopyrightText,
  ExtraText,
  StyledFormArea,
  StyledFormButton,
  StyledTitle,
  TextLink,
} from "./Style";
import { Formik, Form } from "formik";
import { TextInput } from "./FormSetup";
import { FiMail, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

//
import { connect } from "react-redux";
import { loginUser } from "../auth/action/userActions";
import { useHistory } from "react-router-dom";
//

function Login({ loginUser }) {
  const history = useHistory();
  return (
    <div>
      <StyledFormArea>
        <StyledTitle color={colors.theme} size={30}>
          Login Here
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email addrress"),
            password: Yup.string()
              .min(8, "Password must be 8 or more characters")
              .max(20, "Password must not be more than 20 characters"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            //console.log(values);
            loginUser(values, history, setFieldError, setSubmitting);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="aa@aol.com"
                icon={<FiMail />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="****"
                icon={<FiLock />}
              />
              <ButtonGroup>
                {!isSubmitting && (
                  <StyledFormButton type="submit">Login</StyledFormButton>
                )}
                {isSubmitting && (
                  <Loader
                    color={colors.red}
                    type="TailSpin"
                    height={50}
                    width={50}
                  />
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
        <ExtraText>
          Create New Account? <TextLink to="/signup">Sign Up</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All right reserverd &copy;2021</CopyrightText>
    </div>
  );
}

export default connect(null, { loginUser })(Login);
