import requests
import redis
import time
from datetime import datetime
import json

API_URL = "http://localhost:5000/tasks/popular"
REDIS_HOST = "localhost"
REDIS_PORT = 6379
REDIS_DB = 0
CACHE_KEY = "popular_tasks"  

r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

initial_ttl = r.ttl(CACHE_KEY)
if initial_ttl == -2:
    print(f"[INFO] '{CACHE_KEY}' not found in Redis. Initializing cache...")
    sample_data = {"tasks": ["Task A", "Task B", "Task C"]}
    r.set(CACHE_KEY, json.dumps(sample_data), ex=300)
    initial_ttl = r.ttl(CACHE_KEY)
    print(f"[INFO] Cache initialized. New TTL: {initial_ttl} seconds")


start = time.time()
response = requests.get(API_URL)
end = time.time()
response_time = end - start

stats = r.info('stats')
hits = stats.get('keyspace_hits', 0)
misses = stats.get('keyspace_misses', 0)
total = hits + misses
hit_rate = (hits / total) * 100 if total > 0 else 0

if initial_ttl > 0:
    print(f"[INFO] Waiting {initial_ttl + 1} seconds for TTL to expire...")
    time.sleep(initial_ttl + 1)

start_expired = time.time()
response_expired = requests.get(API_URL)
end_expired = time.time()
response_time_expired = end_expired - start_expired

new_ttl = r.ttl(CACHE_KEY)

report = f"""
# Redis Cache Behavior Test Report

- Test Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
- API Endpoint: `{API_URL}`
- Initial TTL: {initial_ttl} seconds
- Response Time (Before Expiry): {response_time:.3f} seconds
- Redis Hit Rate: {hit_rate:.2f}%
- Response Time (After Expiry): {response_time_expired:.3f} seconds
- New TTL After Refresh: {new_ttl} seconds
- Cache Refresh Triggered: {"Yes" if new_ttl > 0 else "No"}

---
"""

print(report)

with open("monitoring/redis_cache_report.md", "w", encoding="utf-8") as f:
    f.write(report)
