
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-components-page-layout-js": preferDefault(require("/Users/rod/Github/gatsby/mmc2022/src/components/page-layout.js")),
  "component---src-pages-404-js": preferDefault(require("/Users/rod/Github/gatsby/mmc2022/src/pages/404.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/rod/Github/gatsby/mmc2022/src/pages/index.js"))
}

