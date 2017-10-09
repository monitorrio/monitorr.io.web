#!/usr/bin/env bash
NODE_ENV=staging pm2 start --name "staging-admin" /home/bitnami/apps/staging-admin.elmahbucket.io/server/server.js
pm2 save
