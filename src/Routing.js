import { h } from "@dependable/view";
import { route, location, params, queryParams } from "./state.js";
import { isEqual } from "./isEqual.js";

export class Routing {
  constructor({ router }) {
    this.updateRouting = () => {
      if (route() !== router.route) {
        route(router.route);
      }
      if (!isEqual(location(), router.location)) {
        location(router.location);
      }
      if (!isEqual(params(), router.params)) {
        params(router.params);
      }
      if (!isEqual(queryParams(), router.queryParams)) {
        queryParams(router.queryParams);
      }
    };
  }

  willMount() {
    this.updateRouting();
    this.unsubscribe = this.props.router.listen(this.updateRouting);
  }

  willUnmount() {
    this.unsubscribe();
  }

  render({ router, children }) {
    return h("Context", { router }, children);
  }
}
