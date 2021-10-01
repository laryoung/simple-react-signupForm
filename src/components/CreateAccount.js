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
import { FiMail, FiLock, FiUser, FiCalendar } from "react-icons/fi";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

//
import { connect } from "react-redux";
import { signUp } from "../auth/action/userActions";
import { useHistory } from "react-router-dom";
//
function CreateAccount() {
  const history = useHistory();
  return (
    <div>
      <StyledFormArea>
        <StyledTitle color={colors.theme} size={30}>
          Create New Account
        </StyledTitle>
        <Formik
          initialValues={{
            email: "",
            password: "",
            repeatPassword: "",
            dateOfBirth: "",
            name: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Invalid email addrress"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be 8 or more characters")
              .max(20, "Password must not be more than 20 characters"),
            name: Yup.string().required("Name is required"),
            dateOfBirth: Yup.date().required("Date field is required"),
            repeatPassword: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password")], "Password does not match"),
          })}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log(values);
            signUp(values, history, setSubmitting, setFieldError);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextInput
                name="name"
                type="text"
                label="Full Name"
                placeholder="firstname lastname"
                icon={<FiUser />}
              />
              <TextInput
                name="email"
                type="text"
                label="Email Address"
                placeholder="aa@aol.com"
                icon={<FiMail />}
              />
              <TextInput
                name="date"
                type="date"
                label="Date of Birth"
                icon={<FiCalendar />}
              />
              <TextInput
                name="password"
                type="password"
                label="Password"
                placeholder="****"
                icon={<FiLock />}
              />
              <TextInput
                name="repeatPassword"
                type="password"
                label="Confirm Password"
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
          Already have an account? <TextLink to="/signin">Sign In</TextLink>
        </ExtraText>
      </StyledFormArea>
      <CopyrightText>All right reserverd &copy;2021</CopyrightText>
    </div>
  );
}

export default connect(null, { signUp })(CreateAccount);
