module.exports = {

    // returns individual game by game id
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

    // returns all games in database
    getGames: (req, res) => {
        req.app
            .get("db")
            .games.get_games()
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => console.log(err));
    },

    // gets indiviual game by URL
    getGameByUrl: (req, res) => {
        req.app
            .get("db")
            .games.get_game_by_url(req.body.url)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => console.log(err));
    }
};