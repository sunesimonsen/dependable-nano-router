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
    let targetProps =
      typeof target === "string"
        ? {
            rel: "noopener",
            target: target,
          }
        : {};

    return h(
      "a",
      {
        href: this.href,
        onClick: this.onClick,
        ...targetProps,
        ...other,
      },
      children
    );
  }
}
