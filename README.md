# Dynamic microfrontend application with single-spa and vite.

PoC of multiple microfrontends configured dynamically via a json file served from a server.
Apps served via vite preview (vite dev cannot serve systemjs modules).
SystemJS modules are used.

### Running
```
npm i
npm run serve
```

App will be available under [http://localhost:8000/root](http://localhost:8000/root).<br>
Available paths:<br>
[http://localhost:8000/root](http://localhost:8000/root) <br>
[http://localhost:8000/welcome](http://localhost:8000/welcome)<br>
[http://localhost:8000/app1](http://localhost:8000/app1)<br>
[http://localhost:8000/app2](http://localhost:8000/app2)<br>

### TODO
- Externalize shared dependencies
- PoC of bundling multiple external dependencies in bigger chunks
- Differentiate between dev and prod build modes
- Put vite config into a separate npm package
- Create a generator for a new app
- Consider communication between apps