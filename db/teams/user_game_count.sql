SELECT
COUNT(CASE WHEN g.title = 'League of Legends' AND t.user_id = $1 THEN 1 END) AS LeagueofLegends,
COUNT(CASE WHEN g.title = 'Smite' AND t.user_id = $1 THEN 1 END) as Smite,
COUNT(CASE WHEN g.title = 'Diablo 3' AND t.user_id = $1 THEN 1 END) as Diablo3,
COUNT(CASE WHEN g.title = 'Destiny 2' AND t.user_id = $1 THEN 1 END) as Destiny2,
COUNT(CASE WHEN g.title = 'Overwatch' AND t.user_id = $1 THEN 1 END) as Overwatch
FROM teams as t
LEFT JOIN requests as r on r.req_id = t.req_id
LEFT JOIN games as g on g.game_id = r.game_id;