// import { Model, INTEGER, STRING } from 'sequelize';
// import db from '.';
// import Matches from './Matches';
// // import OtherModel from './OtherModel';

// class Teams extends Model {
//   id!:number;
//   teamName!:string;
// }

// Teams.init({
//   id: {
//     type: INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   teamName: {
//     type: STRING,
//     allowNull: false,
//   },
// }, {
//   underscored: true,
//   sequelize: db,
//   modelName: 'teams',
//   timestamps: false,
// });

// /**
//   * `Workaround` para aplicar as associations em TS:
//   * Associations 1:N devem ficar em uma das instâncias de modelo
//   * */

// // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Teams.belongsTo(Matches, { foreignKey: 'homeTeam', as: 'home_team1' });
// Teams.belongsTo(Matches, { foreignKey: 'awayTeam', as: 'away_team1' });

// export default Teams;
