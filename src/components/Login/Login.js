import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// emailReducer는 Login 컴포넌트 내의 값을 사용하지 않기 때문에, 외부에 만들 수 있다.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "USER_BLUR") {
    // 여기서 state는 가장 최신의 state 값
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // 입력값(enteredEmail)과 유효성값(emailIsValid)을 하나의 state로 만들어서 useReducer로 관리해보자.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  // 종속성 배열이 빈 배열([])일 때는,
  // 처음 마운트 될 때만 렌더링 된다.
  // 만약 여기서 종속성 배열이 빈 배열이라면,
  // cleanup 함수는 Login 컴포넌트가 DOM에서 제외될 때 동작한다.
  // useEffect(() => {
  //   console.log("effect running");
  //   return () => {
  //     console.log("effect cleanup");
  //   };
  // }, [enteredEmail]);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("checking");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   // 클린업 함수
  //   // 첫 번째 사이드이펙트가 실행되기 전에는 실행되지 않음.
  //   // 하지만 첫 번째 사이드이펙트가 실행되면 먼저 실행됨!
  //   // 새로운 타이머를 설정하기 전에 마지막 타이머를 지움(clearTimeout)
  //   return () => {
  //     console.log("clean up");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);
  const emailChangeHandler = (event) => {
    // type이 있는 객체가 action
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      event.target.value.includes("@") && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // 경우에 따라 가장 최신의 enteredEmail state가 아니라,
    // 과거의 state에 따라 setEmailIsValid state가 업데이트 될 수 있다.
    // 그래서 함수형 업데이트를 사용해야 한다!
    // 기존에 학습 했던 함수형 업데이트는 하나의 state에서 업데이트할 때만 사용할 수 있다.
    // (업데이트 시킬 상태값이 해당 state의 최신값을 참조할 때)
    // 다른 state 값에 의해 state가 업데이트 될 때의 함수형은 'Reducer'를 사용한다.
    // 하나의 state로 병합하는 것이 좋음.
    // 방법1. useState를 통해 상태를 객체로 만들어서 관리하기
    // 방법2. useReducer 사용하기

    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "USER_BLUR" });
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
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
