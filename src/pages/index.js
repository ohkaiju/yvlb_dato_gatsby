import React, { useState } from "react"
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby"
import { Header, Gallery, Layout } from "../components"
import { Article, Toggle, H2, H3, Link, Section } from "../components/elements"
import { FiGrid, FiList } from "react-icons/fi"

const IndexPage = () => {
  const {
    allDatoCmsTheme: { edges }
  } = useStaticQuery(
    graphql`
      query {
        allDatoCmsTheme {
          edges {
            node {
              id
              name
              slug
              thumbnail {
                fluid {
                  ...GatsbyDatoCmsFluid_noBase64
                }
              }
            }
          }
        }
      }
    `
  )
  const images = []
  edges.forEach(e => {
    images.push({
      id: e.node.id,
      link: e.node.slug,
      fluid:
        e.node.thumbnail.fluid,
      figcaption: e.node.name
    })
  })
  const [list, setList] = useState(false)
  return (
    <Layout>
      <Article>
        <Header>
          <H2>Thèmes</H2>
          <Toggle onClick={() => setList(!list)}>
            {list ? <FiGrid size={16} /> : <FiList size={16} />}
          </Toggle>
        </Header>
        {list ? (
          <Section>
            {images.map(e => (
              <Link as={GatsbyLink} to={e.link} key={e.id}>
                <H3 py={1}>{e.figcaption}</H3>
              </Link>
            ))}
          </Section>
        ) : (
          <Gallery edges={images} />
        )}
      </Article>
    </Layout>
  )
}

export default IndexPage
