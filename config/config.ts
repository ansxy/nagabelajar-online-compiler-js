interface IConfig {
  db: Database;
  app: APP;
}

export interface APP {
  host: string;
  port: string;
}

interface Database {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

// use this interface for constructor of class

export class Config {
  config: IConfig = {
    db: {
      host: "",
      port: "",
      user: "",
      password: "",
      database: "",
    },
    app: {
      host: "",
      port: "",
    },
  };
  public getDbConfig(): Database {
    const db: Database = {
      host: process.env.DB_HOST || this.config.db.host,
      port: process.env.DB_PORT || this.config.db.port,
      user: process.env.DB_USER || this.config.db.user,
      password: process.env.DB_PASSWORD || this.config.db.password,
      database: process.env.DB_NAME || this.config.db.database,
    };

    return db;
  }

  public getAppConfig(): APP {
    const app: APP = {
      host: process.env.APP_HOST || this.config.app.host,
      port: process.env.APP_PORT || this.config.app.port,
    };

    return app;
  }
}
