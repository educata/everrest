#!/bin/bash

if [ "$(uname -s)" == "MINGW64_NT-10.0" ]; then
    copy CHANGELOG.md docs/
else
    cp CHANGELOG.md docs/
fi