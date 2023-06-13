import React, { useEffect, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // 종속성 배열이 빈 배열([])일 때는,
  // 처음 마운트 될 때만 렌더링 된다.
  // 만약 여기서 종속성 배열이 빈 배열이라면,
  // cleanup 함수는 Login 컴포넌트가 DOM에서 제외될 때 동작한다.
  useEffect(() => {
    console.log("effect running");
    return () => {
      console.log("effect cleanup");
    };
  }, [enteredEmail]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    // 클린업 함수
    // 첫 번째 사이드이펙트가 실행되기 전에는 실행되지 않음.
    // 하지만 첫 번째 사이드이펙트가 실행되면 먼저 실행됨!
    // 새로운 타이머를 설정하기 전에 마지막 타이머를 지움(clearTimeout)
    return () => {
      console.log("clean up");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
