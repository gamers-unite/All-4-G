DELETE FROM requests
WHERE req_id = $1
RETURNING *;