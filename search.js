const express = require("express");
const router = express.Router();
const superagent = require("superagent");

router.get("/:term", function (req, res, next) {
    const term = req.params.term;

    // request for ITunes
    const url = "http://itunes.apple.com/search";

    superagent
        .get(url)
        .query({ media: "podcast", term: term })
        .set("Accept", "application/json")
        .end(function (err, response) {
            if (err) {
                res.json({
                    confirmation: "fail",
                    message: err,
                });
                return;
            }

            // console.log(JSON.stringify(response));

            let data = JSON.parse(response.text);
            res.json({
                confirmation: "success",
                results: data.results,
            });
        });
});

module.exports = router;
