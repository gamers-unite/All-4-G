DELETE FROM teams
AND req_id = $1
RETURNING *;