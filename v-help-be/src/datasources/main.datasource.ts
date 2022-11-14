import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

/**
 * We're going to read the database config from
 * .env file
 **/
let dotenvModule = require('dotenv');//.config();
let dotenv : any = {};
try{
    dotenv = dotenvModule.config();
    dotenv = dotenv.parsed ?? dotenv;
    if(dotenv.error){
	dotenv = undefined;
    }
}catch(err){
    console.error(err); 
}


/**
 * This is the default dev config.
 * We're not going to override this.
 **/
const config = {
  name: dotenv?.DB_NAME ?? 'main',
  connector: 'mongodb',
  url: dotenv?.DB_URL ?? '',
  host: dotenv?.DB_HOST ?? 'localhost',
  port: dotenv?.DB_PORT ?? 27017,
  user: dotenv?.DB_USER ?? '',
  password: dotenv?.DB_PASSWORD ?? '',
  database: dotenv?.DB_DATABASE ?? 'vhelp-db',
  useNewUrlParser: true
};

const devConfig = {
  name: 'main',
  connector: 'memory',
  localStorage: '',
  file: ''
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MainDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'main';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.main', {optional: true})
    dsConfig: object = config,
  ) {
      //We load devconfig if the .env cannot be loaded or env type is dev
      if((!dotenv) || (dotenv?.DB_MODE === 'dev')  ){
        super(devConfig);
        console.info("Using dev database")
      }
      else{	
	      super(dsConfig);
        console.info("Using production database");
      }
  }
}
