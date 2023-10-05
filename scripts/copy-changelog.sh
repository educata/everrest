#!/bin/bash

if [ "$(uname -s)" == "MINGW64_NT-10.0" ]; then
    copy changelog.md docs/
else
    cp changelog.md docs/
fi