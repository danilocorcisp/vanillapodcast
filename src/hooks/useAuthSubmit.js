import React, { useState } from "react";
import axios from ".axios";

export function useAuthSubmit(path, values) {
    const [error, setError] = useState(false);
    const handleClick = () => {
        axios
            .post(path, values)
            .then(({ data }) => {
                if (!data.sucess) {
                    setError(true);
                } else {
                    location.replace("/");
                }
            })
            .catch((err) => {
                console.log(err);
                setError(true);
            });
    };
}
