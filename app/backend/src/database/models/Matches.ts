// import { Model, INTEGER, STRING } from 'sequelize';
// import db from '.';
// import Teams from './Teams';
// // import OtherModel from './OtherModel';

// class Matches extends Model {
//   id!:number;
//   homeTeam!:string;
//   homeTeamGoals!:string;
//   awayTeam!:string;
//   awayTeamGoals!:string;
//   inProgress!:string;
// }

// Matches.init({
//   id: {
//     type: INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   homeTeam: {
//     type: STRING,
//     allowNull: false,
//   },
//   homeTeamGoals: {
//     type: STRING,
//     allowNull: false,
//   },
//   awayTeam: {
//     type: STRING,
//     allowNull: false,
//   },
//   awayTeamGoals: {
//     type: STRING,
//     allowNull: false,
//   },
//   inProgress: {
//     type: STRING,
//     allowNull: false,
//   },
// }, {
//   underscored: true,
//   sequelize: db,
//   modelName: 'matches',
//   timestamps: false,
// });

// /**
//   * `Workaround` para aplicar as associations em TS:
//   * Associations 1:N devem ficar em uma das instâncias de modelo
//   * */

// Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'home_team' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'away_team' });

// // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// // Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

// export default Matches;
