// @flow

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import styled from "styled-components";
import { TweenMax } from "gsap";
import {
  Footer,
  Group,
  Slider,
  FullImage,
  Image,
  SmallSlider,
} from "../components";
import Enjoy from "../static/enjoy.png";
import Damn from "../static/damn.png";
import Try from "../static/try.png";
import Careers from "../static/videos/GS_Careers-2.mp4";
import { useContentful } from "react-contentful";
import { useLocation } from "react-router-dom";

type TCultureProps = {
  handleLinkChange: Function,
};

const SectionWrap = styled.div`
  position: relative;
  background-color: ${(props) => props.bgc || "#0033a0"};
`;
const HeadshotImg = styled.img`
  width: 8.333%;
  height: auto;
  @media (max-width: 1024px) {
    width: 20%;
  }
`;

const ScrollEffect = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: ${(props) => props.top || "initial"};
  bottom: ${(props) => props.bottom || "initial"};
  height: 0%;
`;

const ScrollEffectDiv = styled.div`
  width: 100%;
  height: 25%;
  background-color: ${(props) => props.color || "auto"};
`;

const TextBox = styled.div`
  position: absolute;
  left: 10%;
  bottom: 15%;
  text-align: left;
  color: white;
  cursor: pointer;
`;
const Title = styled.h1`
  line-height: 110%;
  font-size: 8rem;
  margin-bottom: 2rem;
  font-weight: 300;
  margin-top: 0;
  color: #fffcf2;

  @media (max-width: 1024px) {
    font-size: 3rem;
    font-weight: 300;
    word-wrap: break-word;
    margin-bottom: 1rem;
    &.smaller {
      font-size: 2rem;
    }
  }
`;
const Desc = styled.p`
  font-size: 1rem;
  line-height: 140%;
  font-weight: 300;
  margin-bottom: 1rem;
  width: 30vw;
  position: relative;
  margin: ${(props) => props.margin || 0};
  color: ${(props) => props.color || "#FFFCF2"};
  @media (max-width: 1024px) {
    font-size: 0.8rem;
    width: 70%;
    &.desc {
      display: none;
    }
  }
`;
const OurValues = styled.div`
  font-weight: bold;
  font-size: 0.75rem;
  line-height: 70%;
  margin-bottom: 2rem;
  font-family: "interstate-mono";
  color: #fffcf2;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const MediumText = styled.div`
  font-size: 4rem;
  line-height: 4.7rem;
  text-transform: capitalize;
  font-weight: 300;
  margin: ${(props) => props.margin || 0};
  position: relative;
  color: ${(props) => props.color || "#FFFCF2"};

  @media (max-width: 1024px) {
    font-weight: 300;
    margin: 1rem 0rem;
    width: 80vw;
    font-size: 2rem;
    line-height: 2.2rem;
    margin-top: 50vh;
    margin-left: 2.5rem;
    &.careers {
      margin-top: 10vh;
    }
    br {
      display: none;
    }
  }
`;

const CareersBox = styled.div`
  width: 80vw;
  margin-left: 10vw;
  padding: 2.5rem;
  box-sizing: border-box;
  background-color: #0c2340;
`;

const JobTitle = styled.div`
  font-weight: 300;
  font-size: 2rem;
  line-height: 2.6rem;
  text-transform: capitalize;
  @media (max-width: 1024px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const JobInfo = styled.div`
  font-weight: 300;
  font-size: 1rem;
  line-height: 140%;

  @media (max-width: 1024px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const NewsTitle = styled.div`
  font-size: 4rem;
  margin-top: 10vh;
  margin-bottom: 10vh;
  margin-left: 10vw;
  color: #b1c3d6;
`;

const NewsImg = styled.img`
  height: 80px;
  margin-bottom: 1rem;
  @media (max-width: 1024px) {
    margin-bottom: 0.5rem;
    display: none;
  }
`;

const Info = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  postion: relative;
  opacity: 0;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    opacity: 1;
  }

  .text {
    line-height: 140%;
    font-size: 1rem;
    margin-bottom: 1rem;
    font-weight: ${(props) => props.fw || 300};
    color: #fffcf2;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    left: 2rem;
    width: 80%;

    a {
      text-decoration: none;
      color: #fffcf2;
    }
  }

  @media (max-width: 1024px) {
    opacity: 1;
    background: none;
    margin-bottom: 10vh;
    .text {
      top: 100%;
      font-size: 0.8rem;
    }
  }
`;
const Vid = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 177.77777778vh; /* 100 * 16 / 9 */
  min-width: 100vw;
  min-height: 56.25vw; /* 100 * 9 / 16 */
`;

const scrollAni = (id: string) => {
  TweenMax.to(id, 0.35, { height: "35vh" });
  TweenMax.to(id, 0.35, { height: "0vh", delay: 0.4 });
};
const Culture = (props: TCultureProps) => {
  const { hash } = useLocation();
  const news = useContentful({
    contentType: "news",
  });
  const spoons = useContentful({
    contentType: "spoons",
  });

  if (spoons.loading || !spoons.fetched || news.loading || !news.fetched) {
    return null;
  }

  if (spoons.error) {
    console.error(spoons.error);
    return null;
  }
  if (news.error) {
    console.error(news.error);
    return null;
  }

  const newsItems = news.data.items;
  const spoonsItems = spoons.data.items;

  console.log(newsItems);

  console.log(spoonsItems);
  return (
    <ReactFullpage
      //fullpage options
      licenseKey={"YOUR_KEY_HERE"}
      scrollingSpeed={800} /* Options here */
      onLeave={function (origin, destination, direction) {
        scrollAni(
          `#scroll${origin.index}${direction === "down" ? "Down" : "Up"}`
        );
      }}
      render={({ state, fullpageApi }) => {
        if (state.initialized && hash === "#careers") {
          fullpageApi.moveTo(4);
        }
        return (
          <ReactFullpage.Wrapper>
            <SectionWrap className="section" bgc="#0C2340">
              <Group height="100vh" flexDirection="row" wrap="wrap">
                {spoonsItems[0].fields.headshot.map((x, i) => {
                  return (
                    <HeadshotImg
                      src={x.fields.file.url}
                      alt={x.fields.title}
                      key={i}
                    />
                  );
                })}
              </Group>
              <ScrollEffect bottom="0%" id="scroll0Down">
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
            </SectionWrap>
            <SectionWrap className="section" bgc="#0C2340">
              <Slider
                slideId="work-slider"
                slides={[
                  <Group height="100vh">
                    <FullImage src={Try} alt="slide image" />
                    <TextBox>
                      <OurValues>Our Values</OurValues>
                      <Title> Try Anything </Title>
                      <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        At commodo, bibendum id interdum lobortis praesent
                        lectus. Ullamcorper non pretium tincidunt felis amet. A
                        eget tellus et, amet, accumsan.
                      </Desc>
                      <Desc>See More > </Desc>
                    </TextBox>
                  </Group>,
                  <Group height="100vh">
                    <FullImage src={Damn} alt="slide image" />
                    <TextBox>
                      <OurValues>Our Values</OurValues>
                      <Title> Give A Damn </Title>
                      <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        At commodo, bibendum id interdum lobortis praesent
                        lectus. Ullamcorper non pretium tincidunt felis amet. A
                        eget tellus et, amet, accumsan.
                      </Desc>
                      <Desc>See More > </Desc>
                    </TextBox>
                  </Group>,
                  <Group height="100vh">
                    <FullImage src={Enjoy} alt="slide image" />
                    <TextBox>
                      <OurValues>Our Values</OurValues>
                      <Title>
                        Enjoy <br /> Each Other
                      </Title>
                      <Desc>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        At commodo, bibendum id interdum lobortis praesent
                        lectus. Ullamcorper non pretium tincidunt felis amet. A
                        eget tellus et, amet, accumsan.
                      </Desc>
                      <Desc>See More > </Desc>
                    </TextBox>
                  </Group>,
                ]}
              />
              <ScrollEffect bottom="0%" id={`scroll1Down`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
              <ScrollEffect top="0%" id={`scroll1Up`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
            </SectionWrap>
            <SectionWrap className="section" bgc="#0C2340">
              <Group height="100vh" flexAlign="flex-start">
                <Vid id="vid" autoPlay muted loop>
                  <source id="mp4" src={Careers} type="video/mp4" />
                </Vid>
                <MediumText margin="10vh 10vw 30vh">
                  We love that everyone’s <br /> strange and personal <br />
                  journey brought them here
                </MediumText>
                <Desc color="#FFFCF2" margin="0 10vw 0">
                  We hire playwrights, former politicos, and pro gamers. The
                  humans we hire are what makes the work so damn good. Take a
                  look at some of the Spoons in our drawer and the weird stuff
                  they’re into.
                </Desc>
              </Group>
              <ScrollEffect bottom="0%" id={`scroll2Down`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
              <ScrollEffect top="0%" id={`scroll2Up`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
            </SectionWrap>
            <SectionWrap className="section" bgc="#0033A0">
              <Group height="100vh" flexAlign="flex-start">
                <MediumText
                  margin="10vh 10vw "
                  color="#B1C3D6"
                  className="careers"
                >
                  Who we’re currently looking for
                </MediumText>
                <CareersBox>
                  <Group
                    flexDirection={window.innerWidth > 1025 ? "row" : "column"}
                  >
                    <Group
                      width={window.innerWidth > 1025 ? "30%" : "100%"}
                      flexAlign="flex-start"
                    >
                      <JobTitle> Senior Anaylst </JobTitle>
                    </Group>
                    <Group
                      width={window.innerWidth > 1025 ? "25%" : "100%"}
                      flexAlign="flex-start"
                    >
                      <JobInfo>
                        Media <br /> Los Angeles, CA
                      </JobInfo>
                    </Group>
                    <Group
                      width={window.innerWidth > 1025 ? "45%" : "100%"}
                      flexAlign="flex-start"
                    >
                      <JobInfo>
                        Giant Spoon is looking for a Senior Analyst with a track
                        record for teasing insights from data. Someone who knows
                        the story lies between the lines — a combination of
                        qualitative and quantitative, art and science analysis.
                        See More>
                      </JobInfo>
                    </Group>
                  </Group>
                </CareersBox>
              </Group>
              <ScrollEffect bottom="0%" id={`scroll3Down`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
              <ScrollEffect top="0%" id={`scroll3Up`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
            </SectionWrap>
            <SectionWrap className="section" bgc="#0C2340">
              <Group height="100vh" flexAlign="flex-start">
                <NewsTitle> News </NewsTitle>
                <Group height={window.innerWidth > 1025 ? "50vh" : "80vh"}>
                  <SmallSlider
                    slideId="news-slide"
                    slides={newsItems.map((news) => {
                      console.log(news.fields);
                      return (
                        <Group height="100%">
                          <Image
                            height="50vh"
                            width="auto"
                            src={news.fields.image.fields.file.url}
                            alt={news.fields.image.fields.title}
                          />
                          <Info>
                            <div className="text">
                              {news.fields.publicationImage && (
                                <NewsImg
                                  src={
                                    news.fields.publicationImage.fields.file.url
                                  }
                                  alt={
                                    news.fields.publicationImage.fields.title
                                  }
                                />
                              )}

                              <div>
                                <strong> {news.fields.title} </strong>{" "}
                              </div>
                              <div>{news.fields.blurb}</div>
                              <div>
                                <a href={news.fields.url} target="_blank">
                                  See More >
                                </a>
                              </div>
                            </div>
                          </Info>
                        </Group>
                      );
                    })}
                  />
                </Group>
              </Group>
              <ScrollEffect top="0%" id={`scroll4Up`}>
                <ScrollEffectDiv color="#FE9B96" />
                <ScrollEffectDiv color="#B1C3D6" />
                <ScrollEffectDiv color="#FFFCF2" />
                <ScrollEffectDiv color="#0C2340" />
              </ScrollEffect>
            </SectionWrap>
            <SectionWrap className="section fp-auto-height" bgc="#FE9B96">
              <Footer handleLinkChange={props.handleLinkChange} />
            </SectionWrap>
          </ReactFullpage.Wrapper>
        );
      }}
    />
  );
};

export default Culture;
