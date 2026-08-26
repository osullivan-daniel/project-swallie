import os
import redis
from slowapi import Limiter
from slowapi.util import get_remote_address

from .settings import settings

HOST = settings.redis_host

redis_client = redis.Redis.from_url(settings.redis_uri)

limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=settings.redis_uri,
)

def clear_rate_limits() -> None:
    for key in redis_client.scan_iter(match="LIMITS:LIMITER/*"):
        redis_client.delete(key)