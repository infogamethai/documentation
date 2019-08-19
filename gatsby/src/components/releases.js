import React from "react"
import { StaticQuery, graphql } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer"
import { MDXProvider } from "@mdx-js/react"

import { headline1, headline2, headline3 } from "./releaseHeadlines"

const shortcodes = {
  h1: headline1,
  h2: headline2,
  h3: headline3,
}

const Releases = ({ data }) => (
  <>
    {data.allReleasesJson.edges.map((release, i) => {
      return (
        <div key={i}>
          <h3 className="toc-ignore">{release.node.tag_name}</h3>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>
              {release.node.fields.markdownBody.childMdx.code.body}
            </MDXRenderer>
          </MDXProvider>
          <hr />
        </div>
      )
    })}
  </>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allReleasesJson(
          sort: { fields: [tag_name], order: DESC }
          filter: { fields: { original_id: { gt: 5224487 } } }
        ) {
          edges {
            node {
              id
              tag_name
              body
              fields {
                markdownBody {
                  childMdx {
                    code {
                      body
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Releases data={data} {...props} />}
  />
)
