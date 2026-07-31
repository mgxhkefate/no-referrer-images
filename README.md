# no-referrer-images

> Quartz v5 transformer plugin — automatically add `referrerpolicy="no-referrer"` to external images to bypass hotlink protection.

[Quartz](https://quartz.jzhao.xyz/) v5 plugin · TypeScript · zero runtime dependencies

## Why

Many image hosts (e.g. CSDN's `i-blog.ccsdnimg.cn`) check the `Referer` header and return a 403/placeholder image if the request doesn't originate from their own domain. This plugin strips the referrer for all `http://` and `https://` images at build time, so you can keep writing standard Markdown:

```markdown
![alt](https://i-blog.csdnimg.cn/blog_migrate/example.png)
```

…without hand-writing `<img>` tags or configuring CSP headers.

## How it works

The plugin registers a [rehype](https://github.com/rehypejs/rehype) plugin that walks the HAST tree and sets `referrerpolicy="no-referrer"` on every `<img>` element whose `src` starts with `http://` or `https://`. Local/relative images are left untouched.

| Before | After |
|--------|-------|
| `<img src="https://example.com/img.png" />` | `<img src="https://example.com/img.png" referrerpolicy="no-referrer" />` |
| `<img src="./local-image.png" />` | *(unchanged)* |

## Installation

### Option A — GitHub source (recommended)

```yaml
# quartz.config.yaml
plugins:
  - source: "git+https://github.com/mgxhkefate/no-referrer-images.git"
    enabled: true
```

### Option B — local path

```yaml
plugins:
  - source: "./custom-plugins/no-referrer-images"
    enabled: true
```

> **Windows note:** local-path sources use symbolic links. If your terminal lacks symlink permission, either enable Developer Mode or use the GitHub source instead. See [Quartz docs](https://quartz.jzhao.xyz/) for details.

## Configuration

No options. Just enable it.

## Compatibility

- Quartz v5 (`@quartz-community/types`)
- Node.js ≥ 18

## License

MIT
