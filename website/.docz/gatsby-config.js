const { mergeWith } = require('lodash/fp')

let custom
try {
  custom = require('./gatsby-config.custom')
} catch (err) {
  custom = {}
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'Glue Stack',
    description: 'My Todo App',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        themesDir: 'src',
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: false,
        o: false,
        open: false,
        'open-browser': false,
        root: '/Users/cadellchristo/dev/personal/glue-stack/website/.docz',
        base: '/',
        source: './',
        src: './src/',
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'Glue Stack',
        description: 'My Todo App',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/cadellchristo/dev/personal/glue-stack/website',
          templates:
            '/Users/cadellchristo/dev/personal/glue-stack/website/node_modules/docz-core/dist/templates',
          packageJson:
            '/Users/cadellchristo/dev/personal/glue-stack/website/package.json',
          docz: '/Users/cadellchristo/dev/personal/glue-stack/website/.docz',
          cache:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/.cache',
          app: '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app',
          appPublic:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/public',
          appNodeModules:
            '/Users/cadellchristo/dev/personal/glue-stack/website/node_modules',
          appPackageJson:
            '/Users/cadellchristo/dev/personal/glue-stack/website/package.json',
          appYarnLock:
            '/Users/cadellchristo/dev/personal/glue-stack/website/node_modules/docz-core/yarn.lock',
          ownNodeModules:
            '/Users/cadellchristo/dev/personal/glue-stack/website/node_modules/docz-core/node_modules',
          gatsbyConfig:
            '/Users/cadellchristo/dev/personal/glue-stack/website/gatsby-config.js',
          gatsbyBrowser:
            '/Users/cadellchristo/dev/personal/glue-stack/website/gatsby-browser.js',
          gatsbyNode:
            '/Users/cadellchristo/dev/personal/glue-stack/website/gatsby-node.js',
          gatsbySSR:
            '/Users/cadellchristo/dev/personal/glue-stack/website/gatsby-ssr.js',
          importsJs:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app/imports.js',
          rootJs:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app/root.jsx',
          indexJs:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app/index.jsx',
          indexHtml:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app/index.html',
          db:
            '/Users/cadellchristo/dev/personal/glue-stack/website/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
