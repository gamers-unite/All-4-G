DELETE FROM teams
AND req_id = $2
RETURNING *;