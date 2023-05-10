import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { History } from 'src/history.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    Inject: [ConfigService],
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([History]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
