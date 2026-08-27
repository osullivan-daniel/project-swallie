import pytest

from rate_limit import clear_rate_limits

@pytest.fixture
def reset_rate_limit_cache():
    clear_rate_limits()  # guarantee clean starting state

    yield

    clear_rate_limits()  # don't leave our mess behind