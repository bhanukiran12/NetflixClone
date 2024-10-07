import styled from 'styled-components'

export const Banner = styled.div`
  background-image: url(${props => props.bannerimage});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    height: 50vh;  // Adjust height for smaller screens
  }
`
