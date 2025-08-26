# Redis Cache Behavior Test Report

- Test Time: 2025-08-25 21:17:09
- API Endpoint: `http://localhost:5000/tasks/popular`
- Redis DB Index: 0
- Redis Key Name: `popular_tasks`
- Redis Key Exists: No
- Redis Key Size: 0 bytes
- Initial TTL: -2 seconds
- Response Time (Before Expiry): 0.004 seconds
- Redis Hit Rate: 46.71%
- Response Time (After Expiry): 0.002 seconds
- New TTL After Manual Trigger: -2 seconds
