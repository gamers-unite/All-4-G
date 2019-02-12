UPDATE requests
SET info = $2
WHERE req_id = $1
RETURNING *;