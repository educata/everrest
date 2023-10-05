#!/bin/bash

if [ "$(uname -s)" == "MINGW64_NT-10.0" ]; then
    # windows
    copy CHANGELOG.md docs/
else
    cp CHANGELOG.md docs/
fi