const bcrypt = require("bcryptjs");

module.exports = {
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
                    avatar: user.avatar
                };
                console.log(req.session);
                res.status(201).json(req.session.user);
            })
            .catch(err => console.log(err));
    },

    logInUser: (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        req.app
            .get("db")
            .auth.get_user(email)
            .then(response => {
                console.log(response);
                const foundUser = response;
                const user = foundUser[0];
                if (!user) {
                    // console.log("user not found");
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
                                avatar: user.avatar
                            };
                            console.log(req.session);
                            res.status(200).json(req.session.user);
                        }
                    });
                }
            });
    },

    getUser: (req, res) => {
        const { user_id } = req.body;
        req.app
            .get("db")
            .auth.get_user(user_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.status(200).json("okay");
    },

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
            .then(response => res.status(200).json(response))
            .catch(err => console.log(err));
    }
};
