import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const newUserPassword = newPasswordInputRef.current.value;

    //Could have added a validation here

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDnY_EKc45YVmzYFX8Lj_t8p12MjXRGRG4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newUserPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Password changed!");
          history.replace("/");
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitForm}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
