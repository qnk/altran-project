## Altran project by José A. Cuenca

Thanks for reading! You can skip to the "how to use" part of this documentation at the end.

# Is this a M*C project?

This project is not a MVC program (there are nor views and nor models) but I've used other "typical" elements from this kind of software. It always follows this structure in order to keep clar the responsabilities of everything:

![Flow: routes, middleware, controller, service](http://i.imgur.com/dSQVtaa.png "Application flow")
Where:
  - **Validators:** Validate URI params and could validate post/put body structure using AJV library using JSON schemas v4
  - **Senders:** Separated treatment of the valid answer

Services are global and available for every controller.

# Testing tips

There are tests for Mocha and Newman. To run:
  - **Mocha(4):** as tests are on /test folder, just run > mocha
  - **Newman (26):** Run > newman run ./test/newman/collections.json. Server must be listening or a 503 error will appear. 

# Pending tasks & improvements

There are some potential improvements on the code to improve a little bit more its quality. Here are some 

  - Create a middleware that checks before the execution of the application if logs files exist in order to avoid the crash. If not, create it with fs (file system) module.

  - There are a few syncronous tests for functions for DataService.js file. Real TDD deployment would have every tests.

  - Place input and output values for every function, better if is followed a standarized format.

  - The use of the deferred pattern is starting to be obsolete but allows to use coroutines. With this structure, a migration to NodeJS v8 will be easy.

  - Followed a syntax in order to build a self-explainatory code. Anyway, some extra comments explaining WHY and not WHAT would be recommended.

  - Easy to deploy a mechanism to reject every request which is not a GET request (call Data.includes(['get'], req.method))

  - Documentation and logs should be on an upper folder level to improve security. From root it's proposed:
    - /docs
    - /logs
    - /src (where the code is placed)
---
# How to use this API

Full documentation generated with RAML is found here:

[ALTRAN DOCUMENTATION](http://www.altran.project.docs.mialias.net/)

Credentials are:
  - Username: altran641
  - Password: G8n7yf2D
