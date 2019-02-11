INSERT INTO users
(display_name, email, hash, avatar, blizzard, epic, ps4, riot, steam, xbox)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;