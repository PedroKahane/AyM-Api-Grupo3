import { DataTypes as DT, Model } from "sequelize";
//datatype carga tipos de datos
import connection from "../conection/conection.js";

class User extends Model {}

User.init(
  {
    nombre: {
      type: DT.STRING,
      allowNull: false,
    },
    apellido: {
      type: DT.STRING,
      allowNull: false,
    },
    mail: {
      type: DT.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DT.STRING,
      allowNull: false,
    },
    dni: {
      type: DT.STRING(10),
      allowNull: false,
    },
    SaldoUtilizado: {
      type: DT.INTEGER(),
      allowNull: false,
      validate: {
        max: 5000
      }
    }
  },
  {
    sequelize: connection,
    modelName: "User",
    timestamps: false,
  }
);

export default User;
