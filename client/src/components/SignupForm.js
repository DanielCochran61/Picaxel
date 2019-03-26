import React, {Component} from "react";

class SignupForm extends Component {

    render () {
        return (
            <form>
                Username:
                <input type="text" name="username" />
                Password:
                <input type="text" name="password"/>
            </form>
        )
    }

}

export default SignupForm;