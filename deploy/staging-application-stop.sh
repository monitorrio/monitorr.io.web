#!/usr/bin/env bash

if ls /home/bitnami/.pm2/pids/staging-admin*.pid 1> /dev/null 2>&1;
then
   pm2 delete staging-admin
fi
