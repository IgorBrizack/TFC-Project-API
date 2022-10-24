interface ITeamName {
  teamName: string
}

export default interface IMatches {
  id: number
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: boolean
  teamHome: ITeamName
  teamAway: ITeamName
}
