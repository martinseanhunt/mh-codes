const React = require('react')
const Layout = require('./src/components/layout/Layout').Layout

exports.wrapPageElement = ({ element, props }) => {
  // props provides same data to layout as is received by the page being rendered
  // e.g. location, graphql data etc.
  return <Layout {...props}>{element}</Layout>
}
