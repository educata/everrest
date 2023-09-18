#!/usr/bin/env sh

mdbood_version="v0.4.34"
mdbook_url="https://github.com/rust-lang/mdBook/releases/download/$mdbood_version/mdbook-$mdbood_version-x86_64-unknown-linux-gnu.tar.gz"
dest_dir="../../dist/docs"
input_dir="./docs/api"

# If mdbook is installed in the system
mdbook build $input_dir --dest-dir=$dest_dir

# Curl the binary if mdbook doesn't exist
if [ $? -eq 1 ]; then
    curl -L  $mdbook_url | tar xvz && ./mdbook build $input_dir --dest-dir=$dest_dir
fi
