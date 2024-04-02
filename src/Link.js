import { h } from "@dependable/view";

const shouldNavigate = (e) =>
  !e.defaultPrevented &&
  !e.button &&
  !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);

export class Link {
  constructor() {
    this.onClick = (e) => {
      if (shouldNavigate(e)) {
        e.preventDefault();
        this.router.navigate(this.props);
      }
    };
  }

  get router() {
    return this.context.router;
  }

  get href() {
    return this.router.createUrl(this.props);
  }

  render({ target, children, ...other }) {
    const props = {
      href: this.href,
      rel: "noopener",
      target: target,
      onClick: this.onClick,
      ...other,
    };

    if (typeof target === "string") {
      props.target = target;
    }

    return h("a", props, ...children);
  }
}
