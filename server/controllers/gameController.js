module.exports = {
    getGame: (req, res) => {
        const { game_id } = req.body;
        req.app
            .get("db")
            .games.get_game(game_id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    getGames: (req, res) => {
        req.app
            .get("db")
            .games.get_games()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    }
};
