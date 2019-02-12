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
    getUser,
    authAccount,
    updateUser,
    logout
} = require("./controllers/authController");
const { getGame, getGames } = require("./controllers/gameController");
const {
    getRequest,
    getRequests,
    addRequest,
    editRequest,
    deleteRequest,
    deactivateRequest
} = require("./controllers/requestController");
const {
    getTeams,
    addTeam,
    deleteTeam
} = require("./controllers/teamController");
const { getReports, addReport } = require("./controllers/reportController");
app.use(json());
app.use(cors());
// app.use(express.static(`${__dirname}/../build`));

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
app.post("/users/register", addUser);
app.post(
    "/users/login",
    (req, res, next) => {
        console.log("hit");
        next();
    },
    logInUser
);
app.get("/users", getUser);
app.get("/users/current", currentSession, authAccount);
app.put("/users/update", updateUser);
app.post("/users/logout", logout);

//GAMES ENPOINTS
app.get("/api/games/all", getGames);
app.get("/api/games", getGame);

//REQUEST ENDPOINTS
app.get("/api/requests/request", getRequest);
app.get("/api/requests", getRequests);
app.post("/api/requests", addRequest);
app.put("/api/requests", editRequest);
app.delete("/api/requests", deleteRequest);
app.put("/api/requests/deactivate", deactivateRequest);

//TEAM ENDPOINTS
app.get("/api/teams", getTeams);
app.post("/api/teams", addTeam);
app.delete("/api/teams", deleteTeam);

//REPORT ENDPOINTS
app.get("/api/reports", getReports);
app.post("/api/reports", addReport);

// app.app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../build/index.html"));
// });

app.listen(port, console.log(`Listening on ${port}`));
