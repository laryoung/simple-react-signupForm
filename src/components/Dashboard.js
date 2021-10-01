import React from "react";
import { connect } from "react-redux";
import { logOut } from "../auth/action/userActions";
import { useHistory } from "react-router-dom";
//import syled component
import {
  StyledTitle,
  StyledButton,
  ButtonGroup,
  StyledFormArea,
  colors,
} from "../components/Style";

function Dashboard(props) {
  const history = useHistory();

  return (
    <div>
      <StyledFormArea bg={colors.dark2}>
        <StyledTitle size={65}>Welcome , {props.user.name}</StyledTitle>

        <ButtonGroup>
          <StyledButton to="#" onClick={() => logOut(history)}>
            Logout
          </StyledButton>
        </ButtonGroup>
      </StyledFormArea>
    </div>
  );
}
const mapStateToProps = ({ session }) => ({
  user: session.user,
});
export default connect(mapStateToProps, { logOut })(Dashboard);
