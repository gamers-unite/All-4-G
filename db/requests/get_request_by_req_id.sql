SELECT r.*, u.display_name, u.avatar, u.email FROM requests r
JOIN teams t
ON r.req_id = t.req_id
JOIN users u
ON t.user_id = u.user_id
WHERE r.req_id = $1;