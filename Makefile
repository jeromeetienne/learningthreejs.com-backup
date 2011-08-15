# Makefile to make automatize simple tasks

server:
	rake preview

build:
	rake generate

deploy: build
	rake deploy
