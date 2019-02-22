const bcrypt = require("bcryptjs");

module.exports = {
    
    // returns user on session
    authAccount: (req, res) => {
        res.status(201).json(req.session.user);
    },

    addUser: async (req, res) => {
        const {
            display_name,
            email,
            password,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        } = req.body;
        const hash = await bcrypt.hash(password, 12);
        req.app
            .get("db")
            .auth.add_user(
                display_name,
                email,
                hash,
                blizzard,
                epic,
                ps4,
                riot,
                steam,
                xbox
            )
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.user_id,
                    display_name: user.display_name,
                    email: user.email,
                    avatar: user.avatar,
                    blizzard: user.blizzard,
                    epic: user.epic,
                    ps4: user.ps4,
                    riot: user.riot,
                    steam: user.steam,
                    xbox: user.xbox
                };
                res.status(201).json(req.session.user);
            })
            .catch(err => console.log(err));
    },

    logInUser: (req, res) => {
        const { email, password } = req.body;
        req.app
            .get("db")
            .auth.get_user(email)
            .then(response => {
                const foundUser = response;
                const user = foundUser[0];
                if (!user) {
                    res.status(401).json({
                        error: "Incorrect email or password"
                    });
                } else {
                    bcrypt.compare(password, user.hash).then(response => {
                        const isAuthenticated = response;

                        if (!isAuthenticated) {
                            res.status(403).json({
                                error: "Incorrect email or password"
                            });
                        } else {
                            req.session.user = {
                                id: user.user_id,
                                display_name: user.display_name,
                                email: user.email,
                                avatar: user.avatar,
                                blizzard: user.blizzard,
                                epic: user.epic,
                                ps4: user.ps4,
                                riot: user.riot,
                                steam: user.steam,
                                xbox: user.xbox
                            };
                            res.status(200).json(req.session.user);
                        }
                    });
                }
            });
    },

    //returns user that matches params
    getUser: (req, res) => {
        const { email } = req.params;
        req.app
            .get("db")
            .auth.get_user(email)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.status(200).json("okay");
    },

    // Edits the user profile
    updateUser: (req, res) => {
        const {
            display_name,
            avatar,
            blizzard,
            epic,
            ps4,
            riot,
            steam,
            xbox
        } = req.body;
        req.app
            .get("db")
            .auth.edit_user(
                req.session.user.id,
                display_name,
                avatar,
                blizzard,
                epic,
                ps4,
                riot,
                steam,
                xbox
            )
            .then(response => {
                const user = response[0];
                req.session.user = {
                    id: user.user_id,
                    display_name: user.display_name,
                    email: user.email,
                    avatar: user.avatar,
                    blizzard: user.blizzard,
                    epic: user.epic,
                    ps4: user.ps4,
                    riot: user.riot,
                    steam: user.steam,
                    xbox: user.xbox
                };
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};