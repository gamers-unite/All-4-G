UPDATE users
SET display_name = $2, avatar = $3, blizzard=$4, epic=$5, ps4=$6, riot=$7, steam=$8, xbox=$9
WHERE user_id = $1
RETURNING *;