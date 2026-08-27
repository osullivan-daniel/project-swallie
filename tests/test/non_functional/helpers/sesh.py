import requests
from requests.adapters import HTTPAdapter

def setUpSesh(max_size=10):
    sesh = requests.Session()

    adapter = HTTPAdapter(
        pool_connections=max_size,
        pool_maxsize=max_size,
        pool_block=True,
    )

    sesh.mount("http://", adapter)
    sesh.mount("https://", adapter)

    return sesh