#!/usr/bin/env bash

BRANCH=`git rev-parse --abbrev-ref HEAD`;

git checkout main;
git merge dev;
git checkout $BRANCH;