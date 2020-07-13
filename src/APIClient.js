import superagent from "superagent";
import reduxPromise from "redux-promise";

export default {
    get: (endpoint, params) => {
        return new Promise((resolve, reject) => {
            superagent
                .get(endpoint)
                .query(params)
                .set("Accept", "application/json")
                .end((err, response) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(response.body);
                    console.log("response.body", response.body);
                });
        });
    },
};
