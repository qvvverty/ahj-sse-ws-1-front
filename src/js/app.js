import Chat from './Chat';
import Renderer from './Renderer';
import Control from './Control';

const parentEl = document.querySelector('.chat-container');

const chat = new Chat();
const renderer = new Renderer(parentEl);
const control = new Control();
control.init(parentEl, chat, renderer);
