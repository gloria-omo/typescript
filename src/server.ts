import app, { PORT } from "./app";
import sequelize from "./config/config";
import User from '../src/models/user'

try {
   sequelize.sync();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// sequelize.sync()
//     .then(() => {
//         console.log('All models were synchronized successfully.');
//     })
//     .catch((error) => {
//         console.error('Error during synchronization:', error);
//     });

// app.listen(PORT, () => {
//   console.log(`Server is listening to PORT: ${PORT}`);
// });