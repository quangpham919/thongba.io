import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {
    StyledContainer,
    StyledGreeting,
    StyledName,
    StyledRole,
    StyledDescription,
    StyledButtonLink,
    StyledButtonContainer
} from './styles'
import { email } from '@config'

const Intro = () => {
    // GraphQL Query
    const fetchData = useStaticQuery(graphql`
    query {
        allMarkdownRemark {
              edges {
              node {
                frontmatter {
                  greeting
                  name
                  role
                  buttonResume
                  buttonContact
                }
                html
              }
            }
        }
      }
    `)
    const data = fetchData.allMarkdownRemark.edges[0].node
    const { frontmatter, html } = data
    return (
        <StyledContainer>
            <StyledGreeting>{frontmatter.greeting}</StyledGreeting>
            <StyledName>{frontmatter.name}</StyledName>
            <StyledRole>{frontmatter.role}</StyledRole>
            <StyledDescription dangerouslySetInnerHTML={{__html: html}} />
            <StyledButtonContainer>
                <StyledButtonLink 
                    href="/resume.pdf"
                    target="_blank"
                    rel="nofollow noopener noreferrer">
                    {frontmatter.buttonResume}
                </StyledButtonLink>
                <StyledButtonLink href={`mailto:${email}`}>{frontmatter.buttonContact}</StyledButtonLink>
            </StyledButtonContainer>
        </StyledContainer>
    )
}

export default Intro