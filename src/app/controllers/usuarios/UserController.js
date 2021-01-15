import * as Yup from 'yup';

import User from '../../models/User';

class UserControlller {
  async store(req, res) {
    const schema = Yup.object().shape({
      codigo: Yup.number().required(),
      name: Yup.string().required(),
      status: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: { codigo: req.body.codigo },
    });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { codigo, name, email } = await User.create(req.body);

    return res.json({
      codigo,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      codigo: Yup.number().required(),
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      saldo_san: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { codigo, oldPassword } = req.body;

    const user = await User.findOne({ where: { codigo } });

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(400).json({ error: 'Senha inválida' });
    }

    const { name, email, saldo_san } = await user.update(req.body);

    return res.json({
      codigo: req.body.codigo,
      name,
      email,
      saldo_san,
    });
  }

  async index(req, res) {
    const user = await User.findAll();
    return res.json(user);
  }

  async delete(req, res) {
    const user = await User.findOne({ where: { codigo: req.params.codigo } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não exite!' });
    }

    user.status = 'I';
    user.save();

    return res.json({
      result: 'Usuário inativado com sucesso!',
    });
  }

  async show(req, res) {
    const user = await User.findOne({ codigo: req.userId });

    return res.json({
      saldo_san: user.saldo_san,
    });
  }
}

export default new UserControlller();
