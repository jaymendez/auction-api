import { DB_DATABASE, DB_HOST, DB_PORT, MONGOOSE_URI } from '@config';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
  uri: MONGOOSE_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
