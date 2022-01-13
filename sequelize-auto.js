
//DB에 있는 테이블을 모델 폴더 안에 자동으로 만들어준다.

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(config.database, config.username, config.password, config);
auto.run((err)=>{
  if(err) throw err;
})