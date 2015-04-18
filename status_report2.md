#Status Report One - April 17th

###What we have accomplished this week:
* Migrated our html markup and all code to node.js platform using .ejs templates
* Google+ authentication now works
* built fooditem schema using mongoose
* built fooditem input route for testing
* retrieved fooditem from mongoDB/mongoose and placed onto page via .ejs
* set up outline/framework of functions for up and down votes
* made descisions about site, name change to banaenae, new colors

###Challenges and issues we have faced
* It's been difficult to get everyone in one place.
* Migrating everything onto node.js means we will have to move scraper from Python to JavaScript

### Goals for the next week
* Make responsive up and downvote buttons that 1) change scores, 2) sends lists of upvoted and downvoted ids/fooditems to server
* Implement new colorscheme and site design
* If we have extra time, get alltime and daily pages separate
* Figure out how server and clientside will send votes and update scores, options:
    * authenticated Post route
    * check, validate and record upvotes per day on serverside

### Long term goals, putting things into perspective...
* User schema - adding features that track points, usage patterns maybe
* User and frontend - only allowing one vote per day
* Food schema - tracking usage stats
