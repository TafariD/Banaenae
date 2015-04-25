#Status Report 2 - April 17th

###What we have accomplished this week:
* Migrated our html markup and all code to node.js platform using .ejs templates
* Google+ authentication now works (This is the reason why we migrated everything onto node/express platform)
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

####RE: Ming - comments from status report 1:
* About moving scraper onto JS, this is for couple reasons:
    * 1) so we can use node-scheduler or other cron like packages to run daily scraper on tufts dining menus
    * 2) We have few group members who use python, it's been hard to have everyone contribute
    * 3) to have everything in one place, we can schedule daily scrapes and can directly interact with our designed scheme on mongoose
* Group communication - we are in constant communication through FaceBook, and we have outlined deliverables
