import React, { useState } from "react"
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby"
import { Header, Gallery, Layout } from "../components"
import { Article, Toggle, H2, H3, Link, Section } from "../components/elements"
import { FiGrid, FiList } from "react-icons/fi"
import Img from "gatsby-image"

const IndexPage = () => {
  const {
    allDatoCmsTheme: { edges },
    file: {
      childImageSharp: { fluid }
    }
  } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { regex: "/banner/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
      fluid: e.node.thumbnail.fluid,
      figcaption: e.node.name
    })
  })
  const [list, setList] = useState(true)
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
          <Section style={{ position: "relative" }}>
            {images.map(e => (
              <Link as={GatsbyLink} to={e.link} key={e.id}>
                <H3 py={1}>{e.figcaption}</H3>
              </Link>
            ))}
            <figure style={{ zIndex:-1,position: "absolute", paddingLeft:"65%",top:0, left: 0, right: 0, bottom: 0 }}>
              <Img style={{height:"100%"}} fluid={fluid} alt="yves" />
            </figure>
          </Section>
        ) : (
          <Gallery edges={images} />
        )}
      </Article>
    </Layout>
  )
}

export default IndexPage
