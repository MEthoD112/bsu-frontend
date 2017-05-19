import ArticlesService from './articleservice';
import DomService from './domservice';
import User from './user';
import Images from './images';
import Portal from './portal';

const articlesService = new ArticlesService();

const domService = new DomService();

const user = new User();

const images = new Images();

const portal = new Portal();

export { articlesService, domService, user, images, portal };