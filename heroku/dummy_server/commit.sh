# Modified from Tyler Lubeck's Heroku Commit Script
#	-works around only having one repo

HEROKU_APP="../../../comp20-dummy_server"
GROUP_PROJECT=`pwd`

cp -r * $HEROKU_APP

if [ "$1" =  "-commit"  -o "$1" = "-push" ];then
	COMMITMESSAGE=$2
	echo $COMMITMESSAGE
    git pull
    git add .
    git commit -m "$COMMITMESSAGE"
    git push


	cd $HEROKU_APP
	pwd

    #git pull
	git add *
	git commit -m "$COMMITMESSAGE"

	if [ "$1" = "-push"];then
		git push heroku master
	fi

cd $GROUP_PROJECT

fi