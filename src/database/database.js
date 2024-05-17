const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = new Sequelize("postgres", "postgres.nopybyozhvihaqoiufck", "HQpRX7K51V9RJ3ep", {
  host: "aws-0-sa-east-1.pooler.supabase.com",
  dialect: "postgres",
});

const Usuarios = sequelize.define('usuarios', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
}, { timestamps: false });



const Espaco = sequelize.define('espacos', {
  id_espacos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  local: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lugares: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  situacao: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },

}, { timestamps: false });


const Reservas = sequelize.define('reservas', {

  reserva_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data_reserva: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_espacos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, { timestamps: false });



module.exports = { Espaco, Usuarios, Reservas, sequelize };
