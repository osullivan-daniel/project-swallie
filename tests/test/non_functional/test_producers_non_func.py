import json
import time
import pytest
import allure
import logging

from concurrent.futures import ThreadPoolExecutor

from helpers.sesh import setUpSesh
from helpers.create_producer import create_producer, get_producers

logger = logging.getLogger(__name__)





# TODO: there really has to be a way to make the get and the post a paralmaterised test
#   need to give it some thought but it is doable - the only thing is if you wanted the 
#   gets as a smoke test you might not want to do that solution likely liest in a 
#   paramaterised object - can i tag the object...

@pytest.mark.non_functional
@allure.parent_suite('Non Functional')
@allure.suite('Producers')
@allure.sub_suite('Post Producers')
class Test_Post_Rate_Limit_Producers:


    @allure.title('Test Post Rate Limit Producers')
    def testPostRateLimitProducers(self, reset_rate_limit_cache):

        with allure.step('Setup'):
            sesh = setUpSesh()
            rate_limit = 10

            producer_suffixes = set() # set guarentees uniqness

            while len(producer_suffixes) < rate_limit:
                producer_suffixes.add(time.time_ns())

            producer_suffixes = list(producer_suffixes)


        with allure.step(f'Burn rate limit of {rate_limit} creates'):

            with ThreadPoolExecutor(max_workers=rate_limit) as executor:
                futures = [
                    executor.submit(create_producer, sesh, suffix)
                    for suffix in producer_suffixes
                ]

                results = [future.result() for future in futures]

            logger.debug(results)    

            with allure.step("Verify all attemps completed with 200's"):
                assert all(x.status_code == 200 for x in results), f"Error not all were 200's {results}"
                

        with allure.step('With rate limit burned next create should fail'):

            new_producer_suffix = time.time_ns()
            res = create_producer(sesh, new_producer_suffix)
            res_body = res.json()
            logger.debug(f"Create Response: \n{json.dumps(res_body, indent=4)}")
            
            with allure.step(f'Make assertions'):
                assert res.status_code == 429, f"Expected response code 429 recived {res.status_code}"

                expected_resp = {'error': f'Rate limit exceeded: {rate_limit} per 1 minute'}

                assert res_body == expected_resp, f"""Expected does not match actual,
                                                        expected:: {expected_resp} 
                                                        actual:: {res_body}"""



@pytest.mark.non_functional
@allure.parent_suite('Non Functional')
@allure.suite('Producers')
@allure.sub_suite('Get Producers')
class Test_Get_Rate_Limit_Producers:


    @allure.title('Test Get Rate Limit Producers')
    def testGetRateLimitProducers(self, reset_rate_limit_cache):

        with allure.step('Setup'):
            sesh = setUpSesh()
            rate_limit = 25

        with allure.step(f'Burn rate limit of {rate_limit} gets'):

            with ThreadPoolExecutor(max_workers=rate_limit) as executor:
                futures = [
                    executor.submit(get_producers, sesh)
                    for _ in range(rate_limit)
                ]

                results = [future.result() for future in futures]

            logger.debug(results)    

            with allure.step("Verify all attemps completed with 200's"):
                assert all(x.status_code == 200 for x in results), f"Error not all were 200's {results}"
                

        with allure.step('With rate limit burned next create should fail'):

                res = get_producers(sesh)
                res_body = res.json()
                logger.debug(f"Create Response: \n{json.dumps(res_body, indent=4)}")
                
                with allure.step(f'Make assertions'):
                    assert res.status_code == 429, f"Expected response code 429 recived {res.status_code}"

                    expected_resp = {'error': f'Rate limit exceeded: {rate_limit} per 1 minute'}

                    assert res_body == expected_resp, f"""Expected does not match actual,
                                                            expected:: {expected_resp} 
                                                            actual:: {res_body}"""