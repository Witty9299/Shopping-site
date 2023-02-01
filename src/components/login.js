import { useState } from "react";
import axios from "axios";
import { date } from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)

    const [bogin, setlogin] = useState(
        {
            email: '',
            password: ''
        })
    const handleOnchanget = (key, value) => {
        setlogin({ ...bogin, [key]: value })
    }
    const handleSubmit = () => {
        setloading(true)
        axios({
            method: 'POST',
            url: 'https://api.backendless.com/BFB1C5CE-4984-1444-FFC6-C5F99F8DF500/2D6508CA-D333-4FAD-A55C-94CF94272EB5/users/login',
            data: {
                login: bogin["email"],
                password: bogin["password"],
            }
        }).then((res) => {
            if (res.status == 200) {
                const token = res.data("user-token");
                localStorage.setItem("ecommereAuthtoken", token);
                navigate("/productsfeed")

            }

        }).catch((error) => {
            setloading(false)
            console.log(error);
            toast(error.response.data.message)


        })

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <div style={{ width: 400, height: 600, padding: 20, border: '5px Solid' }}>
                <h3><i>This is login page</i></h3>
                <div className="row mb-3" >
                    <label for="inputEmail3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>Email</label>
                    <div className="col-sm-10">
                        <input type="text"
                            className="form-control"
                            value={bogin.email}
                            onChange={(event) => { handleOnchanget("email", event.target.value) }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputPassword3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>Password</label>
                    <div className="col-sm-10">
                        <input type="password"
                            className="form-control"
                            value={bogin.password}
                            onChange={(event) => { handleOnchanget("password", event.target.value) }}

                        />
                    </div>
                </div>
                {
                    loading ?(
                        <><div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </>
                    ): null
                }

                <button type="submit" className="btn btn-primary" onClick={() => { handleSubmit() }}>Sign in</button>
                <p>Dont have an account please <a href="/signup">Signin</a></p>
            </div>
        </div>
    )
}

export default Login;
