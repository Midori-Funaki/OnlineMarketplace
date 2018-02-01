#!/usr/bin/env bash

dropdb shop_dev
createdb shop_dev
sequelize db:migrate
sequelize db:seed:all