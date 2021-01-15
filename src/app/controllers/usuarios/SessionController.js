import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../../models/User';
import authConfig from '../../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      codigo: Yup.number().required(),
      password: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }    

    const { codigo, password } = req.body;    

    const user = await User.findOne({ where: { codigo } });

    //return res.json(user);

    if (!user) {
      return res.status(401).json({ error: 'usuário não encontrado!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta!' });
    }

    const { name, email, status } = user;

    return res.json({
      user: {
        codigo,
        name,
        email,
        status
      },

      token: jwt.sign({ codigo }, authConfig.secret, {
        expiresIn: authConfig.expireIn,
      }),
    });
  }

  async show(req, res) {
    return res.json({ ok: true, cod_rep: req.userId  });
  }
}

export default new SessionController();
