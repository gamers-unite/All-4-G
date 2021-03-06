require("dotenv").config();

const path = require("path");
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const { json } = require("body-parser");

const port = process.env.SERVER_PORT;
const app = express();

// Socket.io Imports
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Imports 
const { getChatByReq, addToChat } = require("./controllers/chatController");
const { currentSession } = require("./middleware/authMiddleware");
const { addUser, logInUser, getUser, authAccount, updateUser, logout } = require("./controllers/authController");
const { getGame, getGames, getGameByUrl } = require("./controllers/gameController");
const { getRequestsByReqId, getRequestsByGameId, addRequest, editRequest, deleteRequest, deactivateRequest } = require("./controllers/requestController");
const { getTeams, addTeam, deleteTeam, deleteTeamMember, getTeamMember, getUserTeamCount, getUserGameCount } = require("./controllers/teamController");
const { getAllReports, getReports, addReport } = require("./controllers/reportController");

app.use(json());

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
app.post("/users/register", addUser);
app.post("/users/login", logInUser);
app.get("/users/current", currentSession, authAccount);
app.get("/users/:email", getUser);
app.put("/users/update", updateUser);
app.post("/users/logout", logout);

//GAMES ENDPOINTS
app.get("/api/games/all", getGames);
app.get("/api/games", getGame);
app.post("/api/games/url", getGameByUrl);

//REQUEST ENDPOINTS
app.post("/api/requests/game", getRequestsByGameId);
app.post("/api/requests/id", getRequestsByReqId);
app.post('/api/requests/add', addRequest);
app.put("/api/requests", editRequest);
app.delete("/api/requests", deleteRequest);
app.put("/api/requests/deactivate", deactivateRequest);

//TEAM ENDPOINTS
app.get("/api/teams", getTeams);
app.post("/api/teams", addTeam);
app.delete("/api/teams", deleteTeam);
app.delete('/api/teams/user', deleteTeamMember)
app.post('/api/teams/user', currentSession, getTeamMember)
app.get('/api/teams/count/:id', getUserTeamCount)
app.get('/api/teams/count/game/:id', getUserGameCount)

//REPORT ENDPOINTS
app.get("/api/reports/:id", getAllReports);
app.get("/api/reports/current/:id", getReports);
app.post("/api/reports", addReport);

// CHAT ENDPOINTS
app.post("/api/chat", getChatByReq)
app.post("/api/chat/add", addToChat)

// Socket Listeners
io.on('connection', socket => {
    console.log('Sockets Connected')

    socket.on('Enter Room', data => {
        socket.join(data.room)
        // console.log(`Entered Room ${data.room}`)
    })

    socket.on('Joined', data => {
        console.log(`Room ${data.room} is trying to talk`)
        io.to(data.room).emit('Player Joined', data)
    })

    socket.on('Leave', data => {
        console.log(`Room ${data.room} is trying to talk`)
        io.to(data.room).emit('Player Left', data)
    })

    socket.on('disconnect', reason => {
        console.log('Sockets Disconnected')
        console.log('reason: ', reason)
    })

    socket.on('kick', () => {
        io.emit('Kicked Player')
    })

    socket.on("Talking", data => {
        console.log(`${data.room} chatted`)
        io.to(data.room).emit('Received Chat', data)

    })
});

app.get("*", (req, res) => { res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(port, console.log(`Listening on ${port}`));