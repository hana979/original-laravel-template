FROM node:18-alpine AS node-build
FROM php:8.2-fpm-alpine

ENV TZ Asia/Tokyo
ENV COMPOSER_ALLOW_SUPERUSER 1

# install Library
# ベースイメージのOSがalpineの場合は xdebug を使うために autoconf gcc g++ make が必要
RUN apk update && \
    apk add --no-cache --virtual \
    .php-builds \
    oniguruma-dev \
    git \
    zip \
    unzip \
    vim \
    linux-headers \
    bash \
    autoconf gcc g++ make

# Node.jsのステージからNode.jsバイナリとnpmをコピー
COPY --from=node-build /usr/local/bin/node /usr/local/bin/
COPY --from=node-build /usr/local/lib/node_modules/ /usr/local/lib/node_modules/
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
RUN ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# add php-extention-module & xdebug
RUN docker-php-ext-install mbstring pdo_mysql bcmath && \
    docker-php-ext-enable mbstring && \
    pecl install xdebug && \
    docker-php-ext-enable xdebug

# config file COPY
COPY conf/php.ini /usr/local/etc/php/php.ini
COPY conf/docker.conf /usr/local/etc/php-fpm.d/docker.conf

# install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
# ENTRYPOINT ["docker-entrypoint.sh"]
ENTRYPOINT ["/entrypoint.sh"]

WORKDIR /app

CMD ["/bin/ash"]
