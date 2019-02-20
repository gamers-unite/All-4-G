SELECT r.*, u.display_name, u.avatar, u.email FROM requests r
JOIN users u
ON r.creator_id = u.user_id
WHERE game_id = $1 AND r.active IS TRUE;