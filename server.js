const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT ?? 6870;

app.listen(PORT, async () => {
  await connectDB();
  console.log('\x1b[33m%s\x1b[0m', `⚡⚡⚡ Server is running on port: ${PORT} ⚡⚡⚡`)
})
