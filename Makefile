# Makefile to make automatize simple tasks

# jme- official 'server' target but fail to kill some monitor processes
#server:
#	rake preview

server:
	(cd public && python -m SimpleHTTPServer)

build:
	rake generate

deploy: build
	rake deploy
