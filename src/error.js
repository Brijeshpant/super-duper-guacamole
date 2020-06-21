import React, { useState } from "react";

export const Error = (props) => {
    const [errrorMessage] = useState(props.error)
    return (<div className="alert alert-danger">
        {console.log("Error iss ", errrorMessage)}
        <strong> {errrorMessage.message} {errrorMessage.code}</strong>
    </div>)
}