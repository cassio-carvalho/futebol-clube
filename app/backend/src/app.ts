import * as express from 'express';
import loginRouter from './routes/loginRoute';
import matchRouter from './routes/matchesRoute';
import teamRouter from './routes/teamsRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use(teamRouter);

    this.app.use(matchRouter);
    this.app.use(loginRouter);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
