# Makefile to make automatize simple tasks

server:
	rake preview

deploy:
	rake generate
	rake deploy