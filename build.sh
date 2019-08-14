docker build --target api-compile -t gluestack/api-compile .
docker run -it --rm -v $PWD/api/:$PWD -w $PWD -v /var/run/docker.sock:/var/run/docker.sock gluestack/api-compile mvn test
docker build -t gluestack/app .