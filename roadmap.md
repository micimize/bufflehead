Roadmap ideas:

* Documentation of
  - generators, middlewares
  - structure of a domain
  - options, unique features, what bufflehead assumes
  - inefficiencies, limitiations

* Flexibility
  - all core aspects of the front end should be replaceable
  - all domain generators and middleware should be exposed for customization

* Self awareness - An application should know what it's doing.
  - This means that the entire state of the application should be observable at runtime, at least optionally
  - this will allow for automagically generated migrations and large scale refactoring, like the following

* No-commitment - A functioning framework-driven application should be "unpackable".
  This might eventually look something like:
    ```
    new DomainDrivenFullstackApplication(domains).unpack('./migration') /*
    generates the file structure
    ./migration
      | - server/{routes, database}
      | - client/
          | - components/
          | - redux/
              | - constants/
              | - actions/
              | - reducers/
              | - store/createStore
    */
    ```
  rational: Bufflehead is opinionated, and opinions _aren't bad_, but we don't want to be trapped by them.

* Optimizations
One of Bufflehead's goals is to move a lot of "developer thought patterns" into the framework's code. Thus, the framework "knows" that a `client` needs to be served by a `server`, or that a `redux-react client` needs a `redux store`. This allows for terse, expressive code bases, but means that before getting to actual application logic, the framework must "connect the wires" first.
We should be able to run all the framework setup code, then replace it with the result in the compiled output, so it doesn't have to do the same thing over and over in the user's browser

