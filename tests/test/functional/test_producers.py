import json
import time
import pytest
import allure
import logging
import requests
from data import producers_data

logger = logging.getLogger(__name__)

get_url = "http://localhost:8000/producers/producers"
post_url = "http://localhost:8000/producers/createProducer"

@allure.parent_suite('Functional')
@allure.suite('Producers')
@allure.sub_suite('Get Producers')
class Test_Get_All_Producers:


    @allure.title('Test Get All Producers')
    def testGetAllProducers(self):

        with allure.step('Setup'):
            sesh = requests.Session()
            expected_producers = producers_data.expected_producers
            expected_num_of_producers = producers_data.expected_num_of_producers

        with allure.step(f'Make api call to {get_url}'):
            res = sesh.get(url=get_url)
            res_body = res.json()

        with allure.step(f'Parse results'):
            returned_producers = {x["producerName"] for x in res_body}

            logger.debug(f"Returned Producers - {returned_producers}")
            logger.debug(f"Returned Producers count - {len(returned_producers)}")

        with allure.step(f'Make assertions'):
            assert len(res_body) >= expected_num_of_producers , f"Expected at least {expected_num_of_producers} got {len(res_body)} - {returned_producers}"

            missing_producers = expected_producers - returned_producers

            assert not missing_producers, f"Not all expected producers found. {missing_producers} is/are missing"


@pytest.mark.thisOne
@allure.parent_suite('Functional')
@allure.suite('Producers')
@allure.sub_suite('Valid Post Producers')
class Test_Post_Producers_Valid:

    @allure.title('Test Create Valid Producer')
    def testPostNewProducerValid(self):

        with allure.step('Setup'):
            sesh = requests.Session()
            create_payload = producers_data.valid_producer_create()
            producer_suffix = time.time_ns()

            create_payload["producerName"] = f"{create_payload["producerName"]} {producer_suffix}"

        with allure.step(f'Make api call to {post_url}'):
            res = sesh.post(url=post_url, json=create_payload)
            res_body = res.json()
            logger.debug(f"Create Response: \n{json.dumps(res_body, indent=4)}")

        with allure.step(f'Make assertions'):
            with allure.step(f'Validate Response Code'):
                logger.debug(f"Response Code - {res.status_code}")
                assert res.status_code == 200, f"Expected response code 200 recived {res.status_code}"

            with allure.step(f'Validate Expected Response Fileds'):
                assert "producerId" in res_body, f"Expected producerId to be in the response its not, {json.dumps(res_body, indent=4)}"

                res_body.pop("producerId")
                expected_response = {**create_payload, **producers_data.valid_producer_create_response_default_values()}

                logger.debug(f"Expected Response: \n{json.dumps(expected_response, indent=4)}")

                assert expected_response == res_body, f"""Expected does not match actual, 
                                                            expected:: {json.dumps(expected_response, indent=4)} 
                                                            actual:: {json.dumps(res_body, indent=4)}"""


# @allure.parent_suite('Functional')
# @allure.suite('Producers')
# @allure.sub_suite('Invalid Post Producers')
# class Test_Post_Producers_Valid:

#     @allure.title('Test Invalid 0 Duplicate Producer Name')
#     def testPostNewProducerValid(self):

#         with allure.step('Setup'):
#             sesh = requests.Session()
#             create_payload = producers_data.valid_producer_create()
#             producer_suffix = time.time_ns()

#             create_payload["producerName"] = f"{create_payload["producerName"]} {producer_suffix}"

#         with allure.step(f'Make api call to {post_url}'):
#             res = sesh.post(url=post_url, json=create_payload)
#             print(res)
#             res_body = res.json()
#             print(res_body)


#     @allure.title('Test Invalid Producer')
#     def testPostNewProducerInvalid(self):
#         pass