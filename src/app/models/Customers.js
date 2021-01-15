import Sequelize, { Model } from 'sequelize';

class Customers extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_fon: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        cod_rep: {
          type: Sequelize.INTEGER,
        },
        cod_prep: {
          type: Sequelize.INTEGER,
        },
        razao: {
          type: Sequelize.STRING,
        },
        usual: {
          type: Sequelize.STRING,
        },
        cgc: {
          type: Sequelize.STRING,
        },
        flag_fj: {
          type: Sequelize.STRING,
        },
        insc_est: {
          type: Sequelize.STRING,
        },
        ender: {
          type: Sequelize.STRING,
        },
        bairro: {
          type: Sequelize.STRING,
        },
        cidade: {
          type: Sequelize.STRING,
        },
        uf: {
          type: Sequelize.STRING,
        },
        cep: {
          type: Sequelize.STRING,
        },
        fone: {
          type: Sequelize.STRING,
        },
        fax: {
          type: Sequelize.STRING,
        },
        contato: {
          type: Sequelize.STRING,
        },
        dt_cadastro: {
          type: Sequelize.DATE,
        },
        dt_ult_compra: {
          type: Sequelize.DATE,
        },
        cod_linha: {
          type: Sequelize.INTEGER,
        },
        setor: {
          type: Sequelize.STRING,
        },
        flag_dup: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.STRING,
        },
        tipo_compra: {
          type: Sequelize.STRING,
        },
        cod_ativ: {
          type: Sequelize.INTEGER,
        },
        assoc: {
          type: Sequelize.INTEGER,
        },
        flag_lever: {
          type: Sequelize.STRING,
        },
        tem_prior: {
          type: Sequelize.STRING,
        },
        tem_obrig: {
          type: Sequelize.STRING,
        },
        cod_grupolp: {
          type: Sequelize.INTEGER,
        },
        qtd_itens: {
          type: Sequelize.INTEGER,
        },
        med_itens: {
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Customers;
