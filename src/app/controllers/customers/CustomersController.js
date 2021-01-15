import { Op } from 'sequelize';
import Customers from '../../models/Customers';

class CustomersController {
  async store(req, res) {
    await Customers.bulkCreate(req.body, {
      updateOnDuplicate: [
        'cod_rep',
        'cod_prep',
        'razao',
        'usual',
        'cgc',
        'flag_fj',
        'insc_est',
        'ender',
        'bairro',
        'cidade',
        'uf',
        'cep',
        'fone',
        'fax',
        'contato',
        'dt_cadastro',
        'dt_ult_compra',
        'cod_linha',
        'setor',
        'flag_dup',
        'status',
        'tipo_compra',
        'cod_ativ',
        'assoc',
        'flag_lever',
        'tem_prior',
        'tem_obrig',
        'cod_grupolp',
        'qtd_itens',
        'med_itens',
        'updated_at',
      ],
    });

    return res.json({ ok: true });
  }

  async update(req, res) {
    await Customers.update(
      { status: req.body.status },
      {
        where: { cod_rep: req.body.cod_rep },
        fields: ['status'],
      }
    );

    return res.json({ ok: true });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    let texto = '';
    let numero = 0;
    const teste = Number(req.params.texto, 10);

    if (isNaN(teste)) {
      texto = `%${req.params.texto}%`;
    } else {
      numero = req.params.texto;
    }

    let where = {
      cod_rep: req.userId,
      status: '',
    };

    if (req.params.texto !== '*') {
      where = {
        cod_rep: req.userId,
        status: '',
        [Op.or]: [
          {
            razao: { [Op.iLike]: texto },
          },
          {
            cod_fon: numero,
          },
          {
            cidade: { [Op.iLike]: texto },
          },
        ],
      };
    }

    const customers = await Customers.findAll({
      where,
      order: [['razao', 'ASC']],
      limit: 25,
      offset: (page - 1) * 25,
    });

    return res.json(customers);
  }
}

export default new CustomersController();
