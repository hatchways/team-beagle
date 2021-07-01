const jwt = require("jsonwebtoken");
const socket = require("socket.io");
const onlineUsers = require("../onlineUsers/onlineUsers");
const socketCookieParser = require("socket.io-cookie-parser");

exports.appSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true,
        }
    });

    io.use(socketCookieParser());

    // jwt authentication
    io.use((socket, next) => {
        const requestedToken = socket.request.cookies['token'];
        if (!requestedToken) {
            return next(new Error(`There is no token Found!`));
        } else {
            try {
                const accessToken = jwt.verify(requestedToken, process.env.JWT_SECRET);
                return next();
            } catch (error) {
                console.log(error);
            }
        }
    });

    io.on("connection", socket => {
        console.log('User', socket.id, 'Connected');

        // user logs in
        socket.on("login", id => {
            if (!onlineUsers.includes(id)) {
                onlineUsers.push(id);
            };
            socket.broadcast.emit("add-user", id);
            console.log('User', socket.id, 'Logged In');
        });

        //user logs off
        socket.on("logout", (id) => {
            if (onlineUsers.includes(id)) {
                userIndex = onlineUsers.indexOf(id);
                onlineUsers.splice(userIndex, 1);
            }
            socket.broadcast.emit("remove-user", id);
            console.log('User', socket.id, 'Logged Out');
        });

        //disconnect 
        socket.on("disconnect", () => {
            if (onlineUsers.includes(id)) {
                userIndex = onlineUsers.indexOf(id);
                onlineUsers.splice(userIndex, 1);
            }
            socket.broadcast.emit("remove-disconnected-user", id);
            console.log('User', socket.id, 'Disconnected');
        });
    });
}