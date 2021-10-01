import React from "react";
//import syled component
import {
  StyledTitle,
  StyledSubTitle,
  StyledButton,
  ButtonGroup,
} from "../components/Style";

export default function Home() {
  return (
    <div>
      <StyledTitle size={65}>Welcome to Dev Larry</StyledTitle>
      <StyledSubTitle size={27}>Simple Login Demo</StyledSubTitle>
      <ButtonGroup>
        <StyledButton to="/login">Login</StyledButton>
        <StyledButton to="/signup">Sign Up</StyledButton>
      </ButtonGroup>
    </div>
  );
}
