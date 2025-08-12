import { setCache, getCache, deleteCache } from '../services/cacheService.js';

const runTest = async () => {
  const key = 'test:user:1';
  const value = { id: 1, name: 'NAME', role: 'admin' };

  console.log('Setting cache...');
  await setCache(key, value, 10); 

  console.log('Getting cache...');
  const cached = await getCache(key);
  console.log('Cached value:', cached);

  console.log('Waiting 12 seconds for TTL to expire...');
  setTimeout(async () => {
    const expired = await getCache(key);
    console.log('After TTL expired:', expired); 

    console.log('Setting again...');
    await setCache(key, 'temporary value', 5);

    console.log('Deleting cache...');
    await deleteCache(key);

    const afterDelete = await getCache(key);
    console.log('After delete:', afterDelete); 
  }, 12000);
};

runTest();