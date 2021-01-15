require('dotenv/config');

module.exports = {
  dialect: 'postgres',

  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

/**
 * 
//para alterar base de dados em produção
host: '134.209.162.55',
username: 'postgres',
password: 'docker',
database: 'rcauni',

//para alterar base de dados amozon
host: 'database.cwn3jptjiqwp.sa-east-1.rds.amazonaws.com',
username: 'postgres',
password: 'uniport123',
database: 'rcauni',


//para docker-compose - produção ou teste
host: process.env.DB_HOST,
username: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME,

//para usar no ambiente local
DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=rcauni
 */
