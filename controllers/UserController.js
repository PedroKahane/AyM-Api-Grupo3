import User from '../models/User.js';

class UserController {
  constructor() {}
  crearUsuario = async (req, res, next) => {
    try {
      const { nombre, apellido, mail, password, dni } = req.body;
      const result = await User.create({
        nombre,
        apellido,
        mail,
        password,
        dni,
        SaldoUtilizado: 0,
      });
      if (!result) throw new Error('no se pudo crear la actividad');
      res
        .status(200)
        .send({ success: true, message: 'Usuario creado con exito' });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  getUserByDni = async (req, res, next) => {
    try {
      const { dni } = req.params;
      const result = await User.findOne({
        where: {
          dni,
        },
        attributes: ['nombre', 'apellido', 'dni', 'SaldoUtilizado'],
      });
      if (!result) throw new Error('No se encontro usuario con ese dni');
      res
        .status(200)
        .send({ success: true, message: 'Usuario encontrado:', result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  getSaldoByDni = async (req, res, next) => {
    const { dni, saldo } = req.params;
    const result = await User.findOne({
      where: {
        dni,
      },
      attributes: ['SaldoUtilizado'],
    });
    const { SaldoUtilizado } = result;
    if (SaldoUtilizado >= 5000) {
      res
        .status(200)
        .send({ success: false, resultado, message: 'No le queda mas saldo' });
    } else {
      var resultado;
      var saldoDisponible;
      var saldoUtilizado = parseFloat(saldo) + parseFloat(SaldoUtilizado);
      if (saldoUtilizado > 5000) {
        saldoDisponible = 5000 - SaldoUtilizado;
      } else {
        saldoDisponible = parseFloat(saldo);
      }
      resultado = {
        saldoDisponible,
      };
      res
        .status(200)
        .send({ success: true, resultado, message: 'saldo disponible' });
    }
  };
  DescontarSaldoByDni = async (req, res, next) => {
    const { dni, saldo } = req.params;
    const result = await User.findOne({
      where: {
        dni,
      },
      attributes: ['SaldoUtilizado'],
    });
    const { SaldoUtilizado } = result;
    if (SaldoUtilizado >= 5000) {
      res
        .status(200)
        .send({ success: false, resultado, message: 'No le queda mas saldo' });
    } else {
      var resultado;
      var saldoDisponible;
      var saldoPotencial = parseFloat(saldo) + parseFloat(SaldoUtilizado);
      var resultadoUsuario;
      if (saldoPotencial > 5000) {
        saldoDisponible = 5000 - SaldoUtilizado;
        saldoPotencial = 5000;
      } else {
        saldoDisponible = parseFloat(saldo);
      }
      resultadoUsuario = await User.update(
        {
          SaldoUtilizado: saldoPotencial,
        },
        {
          where: {
            dni,
          },
        }
      );
      if (!resultadoUsuario)
        throw new Error('No se pudo hacer el descuento en el usuario');

      resultado = {
        saldoDescontado: saldoDisponible,
        saldoTotalUtilizado: saldoPotencial,
      };
      res.status(200).send({
        success: true,
        resultado,
        message: 'saldo descontado con exito',
      });
    }
  };
}

export default UserController;
