SELECT * FROM teams
WHERE user_id = $1
AND req_id = $2;