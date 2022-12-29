import { FormEvent, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { LoginProps } from "../../interfaces/interfaces";
import "./Login.css";

export const Login = ({ onIdSubmit }: LoginProps) => {
  const idRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  const createNewId = () => {
    onIdSubmit(uuidV4());
  };

  return (
    <div className="login-page">
      <h1 className="chat-title">
        <span className="chat-title-span">Chat</span>App
      </h1>
      <form onSubmit={handleLogin}>
        <div className="login-container">
          <h2 className="login-title">Sign in</h2>
          <input placeholder="Id" className="id-input" ref={idRef} />
          <div className="login-btn-wrapper">
            <button type="submit">Login</button>
            <button onClick={createNewId}>Create new user</button>
          </div>
        </div>
      </form>
    </div>
  );
};
