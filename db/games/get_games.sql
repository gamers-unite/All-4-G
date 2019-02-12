SELECT * FROM games 
WHERE game_id 
IN(SELECT DISTINCT MIN(game_id) 
FROM games 
GROUP BY title);