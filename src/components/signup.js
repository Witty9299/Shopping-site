import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { string, object } from "yup";
import axios from "axios";
import { Navigate } from "react-router-dom";

const requiredschema = object({
    email: string().email().required('required'),
    name: string().min(1).max(15).required('required'),
    password: string().min(6).max(15).required('required'),
    confirmPassword: string().min(6).max(15).required().test('confirm-pass', 'must same with password', function (confirmPassword) {
        return confirmPassword == this.parent.password;
    })

})
const Signup = () => {
    const navigate =useNavigate();
    const params = useParams();
    const [details, setdetails] = useState(
        {
            email: '',
            Name: '',
            password: '',
            confirmPassword: ''
        })
    const [errors, seterrors] = useState({
        email: '',
        Name: '',
        password: '',
        confirmPassword: ''

    })
    const handleOnchange = (key, value) => {
        setdetails({
            ...details,
            [key]: value

        })
    }
    const handleSubmit = () => {
        requiredschema.validate(details, { abortEarly: false }).then((res) => {
            seterrors({})
            axios({
                method: "POST",
                url: "https://api.backendless.com/BFB1C5CE-4984-1444-FFC6-C5F99F8DF500/2D6508CA-D333-4FAD-A55C-94CF94272EB5/users/register",
                data: {
                    name: details["Name"],
                    email: details["email"],
                    password: details["password"]
                }
            }).then((respone) => {
                if(respone.status==200){
                navigate("/login")
                
                }

            }).catch((errors) => {
                console.log("name me")
 
            })

        }).catch((err) => {
            let errobj = {}
            err.inner.map((valerr) => {
                errobj[valerr.path] = valerr.message;
                return true;
            })
            seterrors(errobj)
        })


    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 600, height: 700, padding: 20, display: 'flex', flexDirection: "column", }}>
                <h3><i>Signup Here</i></h3>
                <div className="row mb-3" >
                    <label for="inputEmail3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>Email</label>
                    <div className="col-sm-10">
                        <input type="text"
                            value={details.email}
                            onChange={(event) => { handleOnchange("email", event.target.value) }}
                            className="form-control"
                            placeholder="Email here" />
                    </div>
                    <p className="text-danger">{errors["email"]}</p>
                </div>
                <p className="text-danger"></p>
                <div className="row mb-3">
                    <label for="inputPassword3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>Name</label>
                    <div className="col-sm-10">
                        <input type="text"
                            value={details.Name}
                            className="form-control"
                            placeholder="Name"
                            onChange={(event) => { handleOnchange("Name", event.target.value) }} />

                    </div>
                    <p className="text-danger">{errors["Name"]}</p>
                </div>
                <p className="text-danger"></p>
                <div className="row mb-3">
                    <label for="inputPassword3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>Password</label>
                    <div className="col-sm-10">
                        <input type="password"
                            value={details.password}
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(event) => { handleOnchange("password", event.target.value) }} />

                    </div>
                    <p className="text-danger">{errors["password"]}</p>
                </div>
                <p className="text-danger"></p>
                <div className="row mb-3">
                    <label for="inputPassword3" className="col-sm-2 col-form-label" style={{ marginRight: 20 }}>confirm Password</label>
                    <div className="col-sm-10">
                        <input type="password"
                            value={details.confirmPassword}
                            className="form-control"
                            placeholder="confirm password"
                            onChange={(event) => { handleOnchange("confirmPassword", event.target.value) }} />
                        <p className="text-danger">{errors["confirmPassword"]}</p>
                    </div>
                </div>


                <p className="text-danger"></p>
                <button className="btn btn-primary" onClick={() => { handleSubmit() }}>Sign in</button>
                <div>
                    <p>if you have already an account then <a href="/login"> login</a></p>
                </div>
            </div>
        </div>
    )
}

export default Signup;
