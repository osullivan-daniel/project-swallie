from data import producers_data

create_payload = producers_data.valid_producer_create()

get_url = "http://localhost:8000/producers/producers"
post_url = "http://localhost:8000/producers/createProducer"


def create_producer(sesh, producer_suffix):
    payload = create_payload.copy()
    payload["producerName"] = f'{payload["producerName"]} {producer_suffix}'

    return sesh.post(
        url=post_url,
        json=payload
    )

def get_producers(sesh):

    return sesh.get(
        url=get_url
    )