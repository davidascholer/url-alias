// Create a basic Express server with TypeScript that simply returns "Hello, World!" on the root path.
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('test server');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
