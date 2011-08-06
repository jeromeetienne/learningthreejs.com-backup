# simple makefile to avoid repeatitive tasks

build:
	docco *.js

monitor:
	(while inotifywait -r -e modify,attrib,create . ; do make build; done)



