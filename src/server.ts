import { app } from './app';
import { _env } from './env';

app.listen({ port: _env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`🚀 HTTP server running on port ${_env.PORT}`);
});
