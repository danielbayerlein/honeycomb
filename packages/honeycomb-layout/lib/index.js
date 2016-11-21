import Hapi from 'hapi';
import Hoek from 'hoek';
import Path from 'path';
import Tailor from './middleware/tailor';

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3000,
});

server.register([{
  register: Tailor,
  options: {
    templatesPath: Path.join(__dirname, 'templates'),
  },
}], (registerError) => {
  Hoek.assert(!registerError, registerError);

  server.start((startError) => {
    Hoek.assert(!startError, startError);
    console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
