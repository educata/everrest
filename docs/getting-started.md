---
outline: deep
---

# Getting Started

EverREST is comprised of multiple endpoints (or modules), which you can access
via HTTP requests by specifying the very first parameter of the URL:

```
https://api.everrest.educata.dev/<endpoint_name>/<other_parameters>
```

For example:

```
# Shop endpoint
https://api.everrest.educata.dev/shop/products/all

# Auth endpoint
https://api.everrest.educata.dev/auth/sign_in
```

You can read documentation for each endpoint by following the corresponding
link in the sidebar.

Each endpoint usage example is documented with `curl` command:
[a shell commandline tool](https://curl.se/docs/manpage.html)
in POSIX systems used for transferring data from or to a server using URLs.
Of course, you can utilze any tools, programming languages and frameworks for this
API. The `curl` is universally accepted and allows us to keep the documentation
platform-agnostic.

::: tip SWAGGER
The [swagger documentation](https://api.everrest.educata.dev/swagger#/auth/AuthController_signUp) is also available for EverREST.
:::
