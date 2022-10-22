import config from '~/config';
import { Home, Login, Register, Update, Upload } from '~/pages';
import DefaultLayout from '~/layouts';

const publicRoutes = [
    { path: config.routes.home, element: Home, layout: DefaultLayout },
    { path: config.routes.login, element: Login, layout: DefaultLayout },
    { path: config.routes.register, element: Register, layout: DefaultLayout },
    { path: config.routes.update, element: Update, layout: DefaultLayout },
    { path: config.routes.upload, element: Upload, layout: DefaultLayout },
];

export default publicRoutes;
