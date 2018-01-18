Usage
=====

First, [install Docker](https://docs.docker.com/engine/installation/).

To serve a static website on port 3334:

```sh
generate_in_memory_website \
    | docker run --rm -p 0.0.0.0:3334:80 adamhooper/in-memory-website-http-server
```

In other words: pipe an in-memory website to this Docker container, and it will
serve it.

Piping is great for testing stuff in development. But in production, you'll
probably want a self-contained Docker container. Use a Dockerfile like this:

```Dockerfile
# First, build the website to a file using a Docker build stage
FROM alpine:3.7 as build

RUN generate_in_memory_website > /website-data.in-memory-website


# Next, copy that to the production Docker container
FROM adamhooper/in-memory-website-http-server as production

COPY --from=build /website-data.in-memory-website /
```

You can run this container without piping in data.
