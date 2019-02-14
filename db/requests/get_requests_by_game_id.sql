SELECT r.*, u.display_name, u.avatar FROM requests r
JOIN users u
ON r.creator_id = u.user_id
WHERE game_id = $1;