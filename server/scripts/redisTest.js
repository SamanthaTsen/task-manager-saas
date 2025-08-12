import dotenv from 'dotenv';
import { createClient } from 'redis';
dotenv.config();
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});
const runTests = async () => {
  try {
    await client.connect();
    console.log(' Redis connected');

    // test SET / GET
    await client.set('testSET', 'Redis GET');
    const value = await client.get('testSET');
    console.log('testSET:', value); 
    // test expire
    await client.set('testKey', 'This will expire', { EX: 5 });
    console.log('testKey set with 5s expiry');
    setTimeout(async () => {
      const expiredValue = await client.get('testKey');
      console.log(' testKey after 6s:', expiredValue); }, 6000);
    // test JSON data
    const user = { id: 1, name: 'OK' };
    await client.set('user:1', JSON.stringify(user));
    const cachedUser = JSON.parse(await client.get('user:1'));
    console.log(' Cached user name:', cachedUser.name); 
    // test error connection
    const badClient = createClient({
      socket: { host: 'wronghost', port: 9999 }
    });
    await badClient.connect().catch(err => {
      console.error(' Failed to connect to wrong Redis:', err.message);
    });
  } catch (err) {
    console.error(' Redis error:', err.message);
  }
};
runTests();
