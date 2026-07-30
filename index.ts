import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import type { Root, Element } from "hast"
import type { QuartzTransformerPlugin } from "@quartz-community/types"

// rehype 插件：给所有外链（http/https）图片补上 referrerpolicy="no-referrer"，
// 用来绕过图床（如 CSDN 的 i-blog.csdnimg.cn）基于 Referer 的防盗链。
// 这样在 md 里继续用标准的 ![alt](https://...) 写法即可，无需手写 HTML。
const addNoReferrerToExternalImages: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node: Element) => {
    if (node.tagName !== "img") return
    const src = node.properties?.src
    if (typeof src === "string" && /^https?:\/\//.test(src)) {
      node.properties.referrerpolicy = "no-referrer"
    }
  })
}

export const NoReferrerImages: QuartzTransformerPlugin = () => ({
  name: "no-referrer-images",
  htmlPlugins() {
    return [addNoReferrerToExternalImages]
  },
})

export default NoReferrerImages
