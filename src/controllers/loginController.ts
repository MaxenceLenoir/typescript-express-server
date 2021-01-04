import { NextFunction, Request, Response } from 'express'
import {get, controller, bodyvalidator, post} from './decorators';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

@controller('/auth')
class LoginController {

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label >Email</label>
          <input type="text" name="email"/>
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password"/>
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyvalidator('email', 'password')
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;
  
    if(email && password && email === 'hi@hi.com' && password==='azerty'){
      req.session = { loggedIn: true};
      res.redirect('/');
    } else {
      res.send('You should provide a valid email')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}