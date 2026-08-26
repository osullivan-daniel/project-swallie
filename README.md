## History

For a proper portfolio project, I decided to dust off a COVID-era program I had been working on.

The intention was to build a table-ordering system tailored specifically to taprooms or bars with large, frequently changing beer selections, where beers would often sell out and be replaced with something else.

The 2026 version of this project started pretty much six years to the day after it was put down. Originally built before the advent of AI, using Stack Overflow and YouTube tutorials, it was a purely Angular application with hard-coded values, intended mainly to demonstrate the functionality.

The first problem to solve was the major upgrade from Angular 10 to Angular 22. Thankfully, Angular provides a handy guide on its website and, having used TypeScript quite a bit over the past four years (albeit for backend rather than frontend development), the upgrade was mostly straightforward. For the few areas I did have issues with, mostly the Angular 15 Material changes, I did consult AI — in a web browser rather than plugged directly into the code via CLI or IDE plugins. In 2026, it's far better than Stack Overflow. RIP Stack Overflow.

Once the frontend was separated from the backend, a new Python FastAPI backend was built to interact with a PostgreSQL database. This facilitated the removal of the many hard-coded values from the frontend, moving them instead into the database.

Next came dockerising the application and adding a Redis cache for rate limiting. While this is complete overkill for single-instance Docker containers, the aim here was more to experiment with the functionality than to build something that genuinely needed it.

Finally, the API tests were expanded to include both functional and non-functional testing. Once the authentication layer is implemented, the non-functional test suite can be expanded further. Docker compose ports were intentally left exposed to allow pytest run against it from a local env

## Current Status

The application is currently in a usable/demoable state. The core admin workflow is implemented and the application can be run locally using either the full Dockeriser 'prod' version, or alternativly running the individual dev componants locally (except for the database that is only dockerised)

## Next Steps

- [ ] Review use of enums - text value should only be uused for displaying but there is a disconect FastApi is expecting the text value at the moment - this effects both Order Staus and Variant size
- [ ] Complete Available Products to allow avilability in customer portal to be triggered on off
- [ ] Complete separation of the customer portal from the admin portal
- [ ] Introduce authentication and role-based access
- [ ] Move image storage from application assets to MinIO
- [ ] Add default images
- [ ] Introduce WebSockets for real-time order updates
- [ ] Explore Kubernetes orchestration
- [ ] Update logo size - NG0913: An image with src http://localhost:4200/assets/img/worksOnMyTap.png has intrinsic file dimensions much larger than its rendered size. (shrink the image)
- [ ] Review continued use of admin service
- [ ] Ineffiant reloading on some forms - see Add Product Varient for corect way to do it (staderdise approach)
- [ ] Add the ability to update Price & image
- [ ] Add required messages for markAllAsTouched() - while not technically required as we only enable the button when the form is valid but a double protection
- [ ] Tidy and expand logging


## full dockerised implementation set up

docker-compose up --build (from root dir)  This is where you can tell my docker is an old version you will likely use docker compose up --build!  
alembic upgrade head (from backend dir)  
python -m scripts.seed (from backend dir)  

## local dev commands

start admin      : npm run startAdmin (from root dir)  
start portal     : npm run startPortal (from root dir)  
start backend    : uvicorn app.main:app --reload (from backend dir)  
start db & redis : docker-compose -f docker-compose-db-and-redis up -d 
clean db         : python -m scripts.clean (from backend dir)  
seed db          : python -m scripts.seed (from backend dir)  
access db        : docker exec -it swallie-postgres psql -U swallie -d swallie 
build db         : alembic upgrade head (from backend dir)  
new libarys      : npx nx g @nx/angular:library ........ 
