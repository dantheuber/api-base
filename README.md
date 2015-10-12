# api-base

A base framework created using [generator-swaggerize](https://github.com/krakenjs/generator-swaggerize).


## Install
You will need to install the following dependencies to work with this project

```shell
# install necesarry global depencencies
sudo npm install -g jshint istanbull tape

# navigate to a folder you wish to place the project
cd ~/path/to/project

# clone the repository
git clone https://github.com/dantheuber/api-base.git

# move into the repo
cd api-base/

# install dependencies
npm install
```


## Start Working
```shell
# start the app
npm start

# run tests and coverage
npm test
```

## TODO:
- gulp run server and watch files properly
- 100% coverage
- Swagger-docs do not appear to be building properly? entire specs do not appear to be present when visiting /v1/api-docs.json
