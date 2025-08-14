const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: console.log,
});


/*
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // notwendig für einige Umgebungen
    }
  }
});
*/

/*
const sequelize = new Sequelize(process.env.DB_NAME, 'root', '', {
  host: 'localhost',
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
});
*/

const Customer = require('./customer')(sequelize);
const Order = require('./order')(sequelize);
const OrderItem = require('./orderItem')(sequelize);
const Product = require('./product')(sequelize);
const User = require('./user')(sequelize);

//  Associations
Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Customer.hasMany(Order, { foreignKey: 'customer_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Customer,
  Order,
  OrderItem,
  Product,
  User
};
