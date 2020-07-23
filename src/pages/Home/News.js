// @flow

import React from "react";
import { Wrapper, Slider, Group, FullImage } from "../../components";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";

type TNewsProps = {
  newsItems: Array<Object>,
};
const TextBox = styled.div`
  position: absolute;
  left: 10%;
  bottom: 15%;
  text-align: left;
  color: white;
  cursor: pointer;
`;

const NewsImg = styled.img`
  height: 80px;
  margin-bottom: 1rem;
`;
const NewsTitle = styled.h1`
  line-height: 110%;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 400;
`;
const NewsDesc = styled.p`
  font-size: 1rem;
  line-height: 140%;
  font-weight: 300;
  margin-bottom: 1rem;
  width: 30vw;
  a {
    color: white;
    text-decoration: none;
  }
`;

const News = (props: TNewsProps) => {
  const [ref] = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });
  console.log(props.newsItems);

  const newsItemsArray = props.newsItems
    .filter((news, index) => {
      return index < 3;
    })
    .map((news, index) => {
      return (
        <Group height="100vh">
          <FullImage
            src={news.fields.image.fields.file.url}
            alt={news.fields.image.fields.title}
          />
          <TextBox>
            <NewsImg
              src={news.fields.publicationImage.fields.file.url}
              alt={news.fields.publicationImage.fields.title}
            />
            <NewsTitle> {news.fields.title} </NewsTitle>
            <NewsDesc>{news.fields.blurb}</NewsDesc>
            <NewsDesc>
              {" "}
              <a href={news.fields.url}>See More > </a>
            </NewsDesc>
          </TextBox>
        </Group>
      );
    });

  return (
    <Wrapper height="100vh">
      <div ref={ref}></div>
      <Slider slideId="news-slider" slides={newsItemsArray} />
    </Wrapper>
  );
};

export default News;
