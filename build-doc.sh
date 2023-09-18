#!/usr/bin/env sh

curl -L https://github.com/rust-lang/mdBook/releases/download/v0.4.34/mdbook-v0.4.34-x86_64-unknown-linux-gnu.tar.gz | tar xvz && ./mdbook build ./docs/api --dest-dir="../../dist/docs"