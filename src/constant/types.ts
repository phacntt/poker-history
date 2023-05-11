import sequelize from 'sequelize';

export const EAction = sequelize.ENUM('FOLD', 'CALL', 'RAISE', 'ALLIN');
export const ERoomLvl = sequelize.ENUM('noob', 'mid', 'pro');
