SELECT r.req_id, u.display_name, u.avatar, c.* FROM requests r
JOIN chat c
ON r.req_id = c.req_id
JOIN users u
ON c.user_id = u.user_id
WHERE r.req_id = $1
ORDER BY c.id;