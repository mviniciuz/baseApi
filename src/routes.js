import { Router } from 'express';

import UserController from './app/controllers/usuarios/UserController';
import SessionController from './app/controllers/usuarios/SessionController';


import CustomersController from './app/controllers/customers/CustomersController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.post('/sessions', SessionController.store);

routes.post('/customers', CustomersController.store);
routes.put('/customers', CustomersController.update);

routes.use(authMiddleware);

routes.get('/sessions', SessionController.show);

routes.get('/users', UserController.index);
routes.get('/users/show', UserController.show);
routes.delete('/users/:codigo', UserController.delete);

routes.get('/customers/:texto', CustomersController.index);


//routes.post('/ordersitems', OrdersItemsController.store);
//routes.delete('/ordersitems/:num_doc/:cod_usu', OrdersItemsController.delete);
//routes.get('/ordersitems/:num_doc/:cod_usu', OrdersItemsController.show);
//routes.get('/ordersitems/:num_doc', OrdersItemsController.index);

export default routes;
