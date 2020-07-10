const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    origins: "localhost:8080 127.0.0.1:8080",
});
const compression = require("compression");
const cookieSession = require("cookie-session");
const db = require("./db");
const { hash, compare } = require("./bc");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
let secrets;
if (process.env.PORT) {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

// MIDDLEWARES

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(compression());

app.use(express.json());

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());

    next();
});

const secretCode = cryptoRandomString({
    length: 6,
});

app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// ROUTES

app.post("/register", (req, res) => {
    console.log("req.body: ", req.body);

    let { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPw) => {
            password = hashedPw;

            db.addUserAccount(first, last, email, password).then((response) => {
                req.session.userId = response.rows[0].id;

                res.json({ success: true });
            });
        })
        .catch((err) => {
            console.log("error in register: ", err);
            res.json({ success: false });
        });
});

app.post("/login", (req, res) => {
    if ((req.body.email, req.body.password)) {
        db.getPw(req.body.email)
            .then((data) => {
                let userId = data.rows[0].id;
                let firstName = data.rows[0].first;
                compare(req.body.password, data.rows[0].password).then(
                    (match) => {
                        if (match) {
                            req.session.userId = userId;
                            req.session.firstName = firstName;
                            res.json({ success: true });
                        } else {
                            res.json({ success: false });
                        }
                    }
                );
            })
            .catch((err) => {
                console.log(err);
                res.json({ success: false });
            });
    } else {
        res.json({ success: false });
    }
});

app.post("/password/change", (req, res) => {
    let { email } = req.body;
    // console.log("email: ", email);

    db.getUser(email)
        .then((response) => {
            let currentEmail = response.rows[0].email;

            if (currentEmail == email) {
                let code = secretCode;

                db.createResetCode(email, code)
                    .then(() => {
                        sendEmail(
                            email,
                            `This is your reset code: ${code}`,
                            "Your reset password code"
                        );

                        res.json({ success: true });
                    })
                    .catch((err) => {
                        console.log("error in insert code query: ", err);
                    });
            } else {
                res.json({ sucess: false });
            }
        })
        .catch((err) => {
            console.log("error in post reset-password/email: ", err);
            res.json({ success: false });
        });
});

app.post("/password/change/verify", (req, res) => {
    if (req.body.code && req.body.novaSenha) {
        db.resetCode(req.body.email)
            .then((data) => {
                if (data.rows.length < 1) {
                    res.json({
                        success: false,
                    });
                } else if (data.rows[0].code == req.body.code) {
                    hash(req.body.novaSenha)
                        .then((hashedPw) => {
                            password = hashedPw;
                            db.updatePass(req.body.email, password);
                        })
                        .then(() => {
                            res.json({ success: true });
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                });
            });
    } else {
        res.json({ success: false });
    }
});

app.post("/upload-img", uploader.single("file"), s3.upload, (req, res) => {
    console.log("wohoo subiu pra amazon");

    let url = `https://s3.amazonaws.com/universeimage/${req.file.filename}`;

    if (req.file) {
        db.addImage(req.session.userId, url)
            .then((data) => {
                res.json(data.rows);
            })

            .catch((err) => {
                res.json({
                    error:
                        "There was a problem with your Image. Please try again",
                });
                console.log(err);
            });
    } else {
        res.json({ error: "Select an image file" });
    }
});

app.get("/user", async function (req, res) {
    try {
        const user = await db.getUserId(req.session.userId);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err);
        res.json({ error: "Ops, something went wrong. Try again" });
    }
});

app.get("/user/:id.json", async (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({ self: true });
    } else {
        try {
            const user = await db.getUserId(req.params.id);
            res.json(user.rows[0]);
        } catch (err) {
            console.log(err);
            res.json({ error: "Nothing here!" });
        }
    }
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main === module) {
    server.listen(process.env.PORT || 8080, () =>
        console.log("OVR IS RUNNING!")
    );
}
