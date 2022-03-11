module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  prot: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    mgirationsDir: "src/migrations",
  },
};
