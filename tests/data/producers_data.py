import uuid

# When we seed the db we start with 3
expected_num_of_producers = 3
# When we seed the db we expect at least these
expected_producers = {
    "Boundary Brewing",
    "WHITEWATER BREWING CO.",
    "Longbridge Drinks Co",
}


def valid_producer_create():
    return {
        "producerName": "Test Producer",
        "address": {
            "address": {
                "city": "Belfast",
                "county": "Antrim",
                "country": "Northern Ireland",
                "street1": "Building Number 1",
                "street2": "Test Road",
                "postCode": "BT1 5GS",
            }
        },
        "description": "This is an autoamtion Producer",
    }


def valid_producer_create_response_default_values():
    return {
        "description": None,
        "isActive": True, 
        "products": []
    }
