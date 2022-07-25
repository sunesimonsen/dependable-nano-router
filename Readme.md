# @dependable/nano-router - [API](./API.md)

This package provides
[@dependable/view](https://github.com/sunesimonsen/dependable-view)
integration for the [nano-router](https://github.com/sunesimonsen/nano-router/tree/master/packages/router).

## Installation

```sh
npm install @nano-router/history @dependable/nano-router
```

## Usage

### Setup your routes

```js
import { Routes, Route } from "@dependable/nano-router";

const routes = new Routes(
  new Route("posts/new", "/posts/new"),
  new Route("posts/edit", "/posts/:id"),
  new Route("posts", "/posts")
);
```

See [@nano-router/routes](https://github.com/sunesimonsen/nano-router/tree/master/packages/routes) for more information about the route
configuration.

### Add the router to your application

```js
import { html, render } from "@dependable/view";
import { Router } from "@dependable/nano-router";
import { createBrowserHistory } from "@nano-router/history";

import { routes } from "./routes";
import { RootView } from "./RootView";

const history = createBrowserHistory();
const router = new Router({ routes, history });

class App {
  render() {
    return html`
      <Routing router=${router}>
        <${RootView} />
      </Routing>
    `;
  }
}

render(html`<${App} />`, document.getElementById("app"));
```

### Switch on the route name

```js
import { route } from "@dependable/nano-router";
import { html } from "@dependable/view";
import { PostNew } from "./PostNew";
import { PostEdit } from "./PostEdit";
import { PostList } from "./PostList";

const views = {
  "posts/new": html`<${PostNew} />`,
  "posts/edit": html`<${PostEdit} />`,
  posts: html`<${PostList} />`,
};

export class RootView {
  willMount() {
    if (!views[route()]) {
      this.context.router.navigate({
        route: "posts",
        replace: true,
      });
    }
  }

  render() {
    return views[route()] || views.posts;
  }
}
```

### Use routing information in your views

The routing information in available as observables `route`, `params`, `queryParams` and `location`.

```js
import { html } from "@dependable/view";
import { Link, params } from "@dependable/nano-router";
import { savePost, body } from './model.js'

export class PostEdit {
  constructor() {
    this.onSave = (e) => {
      savePost()

      this.context.router.navigate({
        route: 'posts',
        state: { type: 'notification', message: 'POST_CREATED_SUCCESS' }
      }))
    }

    this.updateBody = e => {
      body(e.target.value)
    }
  }

  render({ id, body }) {
    return html`
      <form>
        <label>Post ${id}</label>
        <textarea value=${body()} onChange=${this.updateBody}/>
        <button onClick=${this.onSave}>Save</button>
      </form>
      <${Link} route="posts">Posts<//>
    `
  }
}
```

## MIT License

Copyright (c) 2022 Sune Simonsen <mailto:sune@we-knowhow.dk>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
