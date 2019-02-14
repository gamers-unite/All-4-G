INSERT INTO requests (creator_id, team_length, game_id, platform, info)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;