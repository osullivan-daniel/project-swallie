# bin/bash

rm -rf .allure-results;
pytest -m functional -n 5 --alluredir .allure-results/; 
pytest -m non_functional -n 1 --alluredir .allure-results/; 

allure serve .allure-results;
