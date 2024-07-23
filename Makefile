# Defining Variables

registry = 246341951723.dkr.ecr.us-east-2.amazonaws.com
image_tag = build-$(shell date '+%d-%m-%y-%H-%M-%S')
repository_uri = $(registry)/main-api

# Authenticate with AWS
.PHONY: authenticate
authenticate:
	aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin $(registry)

# Install dependencies
install:
	npm install

# Transpile js
transpile:
	npm run build

# Build docker image

build:
	docker build --build-arg STAGE=production -t $(repository_uri):latest .

# Tag image

tag:
	docker tag $(repository_uri):latest $(repository_uri):$(image_tag)

# Push image

push: authenticate tag
	docker push $(repository_uri):latest
	docker push $(repository_uri):$(image_tag)

#  Deploy the image

deploy: install transpile build tag push
