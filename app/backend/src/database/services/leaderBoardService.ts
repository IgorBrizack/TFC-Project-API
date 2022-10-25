import Sequelize from '../models';

const QUERY1 = `SELECT team_name AS name,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalPoints,
COUNT(teams.id) AS totalGames,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
END) AS totalVictories,
SUM(CASE 
WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalDraws,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
END) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
SUM(home_team_goals) - SUM(away_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) / (COUNT(teams.id)*3)) * 100, 2) AS efficiency
FROM matches
INNER JOIN teams
ON matches.home_team = teams.id
WHERE in_progress = '0'
GROUP BY team_name
ORDER BY totalPoints DESC,
goalsBalance DESC,
totalVictories DESC,
goalsFavor DESC,
goalsOwn DESC`;

const QUERY2 = `SELECT team_name AS name,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalPoints,
COUNT(teams.id) AS totalGames,
SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 1
    ELSE 0
END) AS totalVictories,
SUM(CASE 
WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) AS totalDraws,
SUM(CASE 
WHEN home_team_goals > away_team_goals THEN 1
    ELSE 0
END) AS totalLosses,
SUM(away_team_goals) AS goalsFavor,
SUM(home_team_goals) AS goalsOwn,
SUM(away_team_goals) - SUM(home_team_goals) AS goalsBalance,
FORMAT((SUM(CASE 
WHEN home_team_goals < away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    ELSE 0
END) / (COUNT(teams.id)*3)) * 100, 2) AS efficiency
FROM matches
INNER JOIN teams
ON matches.away_team = teams.id
WHERE in_progress = '0'
GROUP BY team_name
ORDER BY totalPoints DESC,
goalsBalance DESC,
totalVictories DESC,
goalsFavor DESC,
goalsOwn DESC`;

export default class LeaderBoardService {
  constructor(private model = Sequelize) {}

  public async getLeaderBoard() {
    const [leaderboard] = await this.model.query(QUERY1);
    return leaderboard;
  }

  public async getAwayLeaderBoard() {
    const [leaderboard] = await this.model.query(QUERY2);
    return leaderboard;
  }
}
