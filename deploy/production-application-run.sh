#!/usr/bin/env bash
NODE_ENV=production pm2 start --name "production-admin" /home/bitnami/apps/admin.monitorr.io/server/server.js
pm2 save
