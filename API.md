# API @dependable/nano-router

## Route

See [@nano-router/routes](https://github.com/sunesimonsen/nano-router/tree/master/packages/routes/API.md#Route).

## Routes

See [@nano-router/routes](https://github.com/sunesimonsen/nano-router/tree/master/packages/routes/API.md#Routes).

## Router

See [@nano-router/router](https://github.com/sunesimonsen/nano-router/tree/master/packages/router/API.md#router).

## Routing

The main routing container that is listening for navigation events.

It takes a [router](https://github.com/sunesimonsen/nano-router/tree/master/packages/router/Readme.md) instance.

Creating a router for the browser history:

```js
import { html } from "@dependable/view";
import { Router, Routing } from "@dependable/nano-router";
import { createBrowserHistory } from "@nano-router/history";

const history = createBrowserHistory();
const router = new Router({ history, routes });

class App {
  render() {
    return html` <${Routing} router=${router}> ... <//> `;
  }
}
```

Creating a router for a memory history useful for testing:

```js
import { html } from "@dependable/view";
import { Router, Routing } from "@dependable/nano-router";
import { createMemoryHistory } from "@nano-router/history";

const history = createMemoryHistory();
const router = new Router({ history, routes });

class App {
  render() {
    return html` <${Routing} router=${router}> ... <//> `;
  }
}
```

## Link

A link component that uses the routes to set the `href`.

```js
import { html } from "@dependable/view";
import { Link } from "@dependable/nano-router";

class CreatePostLink {
  render() {
    return html` <${Link} route="posts/new">Create<//> `;
  }
}
```

You can provide anything that is accepted by the [router.navigate](https://github.com/sunesimonsen/nano-router/blob/master/packages/router/API.md#navigate)

```js
import { html } from "@dependable/view";
import { Link } from "@dependable/nano-router";

class EditPostLink {
  render() {
    return html`
      <${Link}
        route="posts/edit"
        params=${{ id: 42 }}
        queryParams=${{ showSettings: true }}
      >
        Edit
      <//>
    `;
  }
}
```
