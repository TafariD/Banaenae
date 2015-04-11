#Status Report One - April 10th

###What we have accomplished so far:
* Written the basics of the scraper in python
* Used Bootstrap templates on pages
* Written dummy server on heroku that responds to get requests, sending test JSONs
* Implemented functions in javascript for rendering and sorting data from server
* Made plans for how client and servers interact

###Challenges and issues we have faced
* It's been difficult to get everyone in one place, but we have a good skeleton of the site up. Hopefully, we can now better distribute the work
* Scraper is written in python and it may be better to re-write it in javascript, and host it on the same server that deals with client requests
* Bootstrap has been difficult to understand initially

### Goals for the next week
* Create upvote and downvote buttons on site that change scores clientside
* Make some decisions regarding site design, colors, themes, etc.
* Save votes and be able to send lists of upvoted and downvoted items to a server via Post
* Write the "POST" side of the server/API
* If we have extra time, get alltime and daily pages separate

### Long term goals, putting things into perspective...
* Authentication and site membership, we need to find a way to do this, O.Auth2, Facebook, Google are some options we have thought about
* Learn more bootstrap - we understand and have a good sense of what we need to do serverside, the front end is a different story...