const path = require("path");
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
const app = express();
const { currentSession } = require("./middleware/authMiddleware");
const {
    addUser,
    logInUser,
    authAccount,
    updateUser,
    logout
} = require("./controllers/authController");
const { getGame, getGames } = require("./controllers/gameController");
app.use(json());
app.use(cors());
app.use(express.static(`${__dirname}/../build`));

massive(process.env.CONNECTION_STRING)
    .then(db => {
        app.set("db", db);
        console.log("Database Connected");
    })
    .catch(err => console.log(err));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

//AUTH ENDPOINTS
app.post("/user/register", addUser);
app.post("/user/login", logInUser);
app.get("/user/current", currentSession, authAccount);
app.put("/user/update", updateUser);
app.post("/user/logout", logout);

//GAMES ENPOINTS
app.get("api/allgames", getGames);
app.get("api/game", getGame);

//REQUEST ENDPOINTS
app.get("/api/requests");
app.post("/api/request");
app.put("/api/request");
app.delete("/api.requests");

//TEAM ENDPOINTS

app.app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, console.log(`Listening on ${port}`));
