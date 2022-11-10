import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const token = sessionStorage.getItem("token")

  const handleClick = () => {

	const opts = {
		method: 'POST',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			"email": email,
			"password": password
		}),
	}

	fetch('https://3001-4geeksacade-reactflaskh-te7j5em1pil.ws-us75.gitpod.io/api/token', opts)
	.then(resp => {
		if(resp.status === 200) return resp.json()
		else alert("There has been an error!")
	})
	.then(data => {
		sessionStorage.setItem("token", data.access_token)
	})
	.catch(error => {
		console.error("There was an error!", error)
	})
  }

  return (
    <div className="text-center mt-5">
      <h1>Login</h1>
	  {(token && token !="" && token!= undefined) ? "You are logged-in with this token" + token :
      <form>
		<div className="container col-2">
        <div className="row mb-3">
			
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Login
        </button>
		</div>
		</form>
		}
    </div>
  );
};
