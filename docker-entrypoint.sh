#!/bin/sh
set -e

# Create temporary directories required by nginx for read-only filesystem
mkdir -p /tmp/client_body
mkdir -p /tmp/proxy
mkdir -p /tmp/fastcgi
mkdir -p /tmp/uwsgi
mkdir -p /tmp/scgi

# Create cache directory for nginx
mkdir -p /var/cache/nginx

# Execute the CMD (nginx)
exec "$@"
