import app, { PORT } from "./app";
import sequelize from "./configuration/config";
import User from '../src/models/user'

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(PORT, () => {
  console.log(`Server is listening to PORT: ${PORT}`);
});
