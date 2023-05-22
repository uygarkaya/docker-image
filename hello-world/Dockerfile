########################################################################
##                 Basic Flow for Creating Dockerfile                 ##
########################################################################
## 1. Specify a base image                                            ##
## 2. Run some commands to install additional properties/dependencies ##
## 3. Specify a command to run an container start-up                  ##
########################################################################

# Use an existing docker image as a base
FROM python:3.7

# Download and install a properties/dependency
ADD main.py /

# Tell the image what to do when it starts as a container
CMD ["python3", "./main.py"]