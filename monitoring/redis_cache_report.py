import redis
import requests
import time
from datetime import datetime

# Redis configuration
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0
REDIS_KEY = 'popular_tasks'

# API configuration
API_URL = 'http://localhost:5000/tasks/popular'

# Connect to Redis
r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

# Record test time
test_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
filename_time = datetime.now().strftime('%Y%m%d_%H%M%S')

# Get initial TTL of the key
initial_ttl = r.ttl(REDIS_KEY)

# Check if the key exists
key_exists = r.exists(REDIS_KEY) == 1

# Get memory usage of the key (in bytes)
key_size = r.memory_usage(REDIS_KEY) if key_exists else 0

# Redis DB index
db_index = REDIS_DB

# Get Redis hit rate
info = r.info('stats')
hits = info.get('keyspace_hits', 0)
misses = info.get('keyspace_misses', 0)
hit_rate = round(hits / (hits + misses) * 100, 2) if (hits + misses) > 0 else 0.0

# Measure response time before cache expiry
start = time.time()
response = requests.get(API_URL)
before_expiry_time = round(time.time() - start, 3)

# Simulate cache expiry by deleting the key
r.delete(REDIS_KEY)

# Measure response time after cache expiry
start = time.time()
response = requests.get(API_URL)
after_expiry_time = round(time.time() - start, 3)

# Get TTL after manual trigger (should be -2 if key doesn't exist)
new_ttl = r.ttl(REDIS_KEY)

# Compose Markdown report
report = f"""# Redis Cache Behavior Test Report

- Test Time: {test_time}
- API Endpoint: `{API_URL}`
- Redis DB Index: {db_index}
- Redis Key Name: `{REDIS_KEY}`
- Redis Key Exists: {'Yes' if key_exists else 'No'}
- Redis Key Size: {key_size} bytes
- Initial TTL: {initial_ttl} seconds
- Response Time (Before Expiry): {before_expiry_time} seconds
- Redis Hit Rate: {hit_rate}%
- Response Time (After Expiry): {after_expiry_time} seconds
- New TTL After Manual Trigger: {new_ttl} seconds
"""

# Save report to Markdown file
filename = f"monitoring/redis_cache_report_{filename_time}.md"
with open(filename, 'w') as f:
    f.write(report)

print(f"Report saved to: {filename}")
