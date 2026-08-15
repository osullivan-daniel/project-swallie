For a proper portfolio project i decided to dust off a covid era progrtam i was working on.

The intention was to build a program for table ordering but tailor specifically to tap rooms or bar that had frequently changing beers and when they ran out would swap it for something else

The 2026 version of this project started prety much 6 years to the day it was put down. Built before the advent of AI off of stalk overflow and youtub tutorials

The first problem to solve was the major upgrade from angular 10 to angular 22. Thankfully angular provide a handy guide on their website  and having used typescript quite a bit over tyhe past 4 years (all be it for backend rather than front end) it was mostly straight forward and for the few bits i did have issues with (mostly the angular 15 mat changes) having used AI quite a bit this year with work they were straight forward tweeks

At this point the main issue is typing which has curently been disabled. The plan of action is to now seperate the user and admin into too seperate apps, and start building the backend. As we intigrate the backend we will sort the typing

And by we I mean me - its a Cork thing...
Although Ai might be helping so it really is we just mostly me!


start admin  : npm run startAdmin (from root dir) 
start portal : npm run startPortal (from root dir) 
start backend: uvicorn app.main:app --reload (from backend dir) 
start db     : docker-compose up -d (from root dir) 
clean db     : python -m scripts.clean (from backend dir) 
seed db      : python -m scripts.seed (from backend dir) 
access db    : docker exec -it swallie-postgres psql -U swallie -d swallie
new libarys  : npx nx g @nx/angular:library ........