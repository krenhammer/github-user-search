#!/usr/bin/env bash

BRANCH=`git rev-parse --abbrev-ref HEAD`;

git checkout deploy;
git merge main;
git checkout $BRANCH;