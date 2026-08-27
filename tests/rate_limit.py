import redis

HOST = "redis://localhost:6379"

redis_client = redis.Redis.from_url(HOST)

def clear_rate_limits() -> None:
    for key in redis_client.scan_iter(match="LIMITS:LIMITER/*"):
        redis_client.delete(key)
