import React from "react"
import { Link } from "gatsby"
import { getFirebase } from "../firebase"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import ReactHtmlParser from "react-html-parser"
import {
  Button,
  Typography,
  Flexbar,
  BarItem,
  ScrollView,
  Card,
  CardBody,
  Separator,
} from "../components/ArsenalUI"
import { MdMoreVert, MdLocationOn, MdModeComment } from "react-icons/md"
import { FaRegHeart } from "react-icons/fa"
import bgImage from "../images/city.svg"
import heroBg from "../images/heroBg.svg"
import heroTitle from "../images/heroTitle.svg"
import { AnimateOnChange } from "react-animation"
import axios from "axios"

//  flexbar at the bottom because border-sizing seems to not be working

// const styleSlideIn = {
//   animation: animations.slideIn,
// }

const IndexPage = () => {
  const [windowLoaded, setWindowLoaded] = React.useState(false)
  const [timer, setTimer] = React.useState()
  const [wordIndex, setIndex] = React.useState(0)
  // firebase
  const [articles, setArticles] = React.useState([])
  const [places, setPlaces] = React.useState([])
  const [firstPlace, setFirstPlace] = React.useState([])

  let index = 0
  let word = ["SEXY", "FAST", "RELIABLE"]

  const startTimer = () => {
    let index = 0
    return setInterval(() => {
      if (index === word.length - 1) {
        index = 0
        setIndex(0)
      } else {
        // console.log("here" + index)
        index++
        setIndex(index)
      }
    }, 2000)
  }

  React.useEffect(() => {
    // firebase
    const lazyFirebase = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")

    Promise.all([lazyFirebase]).then(([firebase]) => {
      const firestore = getFirebase(firebase).firestore()
      firestore.collection("articles").onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()))
        setArticles(snapshot.docs.map(doc => doc.data()))
      })

      firestore.collection("places").onSnapshot(snapshot => {
        console.log(snapshot.docs.map(doc => doc.data()))
        setPlaces(snapshot.docs.map(doc => doc.data()))
      })
    })
    // firebase end

    const timerId = startTimer()
    setTimer(timerId)
    setWindowLoaded(true)
    return () => timer()
  }, [])

  return (
    <Layout>
      <SEO title="Explore" />
      <section id="hero">
        <div className="relative h-auto bg-gray-200">
          <img
            className="absolute z-1 h-full w-full object-cover"
            src={heroBg}
            alt=""
          />
          <div
            style={{ background: "rgba(34, 34, 34, 0.75)" }}
            className="absolute z-10 h-full w-full"
          />
          <div className="relative w-full flex items-center flex-col pt-8 h-full z-50">
            <img className="w-24 h-10" src={heroTitle} alt="Stealthist" />
            <Typography heroBody>Starter Kits That Help You Ship</Typography>
            {windowLoaded ? (
              <AnimateOnChange
                animationIn="bounceIn"
                animationOut="bounceOut"
                durationOut={500}
              >
                <Typography textStyles={{ color: "#7289DA" }} heroTitle>
                  {word[wordIndex]}
                </Typography>
              </AnimateOnChange>
            ) : null}
            <Typography heroBody>Web Apps In Record Time</Typography>
            <Button
              titleColor="rgb(114, 137, 218)"
              paddingY="4"
              paddingX="8"
              buttonStyles={{
                marginTop: 40,
                borderWidth: 2,
                borderColor: "rgb(114, 137, 218)",
                marginBottom: 80,
                background: "transparent",
              }}
              title="Sign Up For Beta"
            ></Button>
          </div>
        </div>
      </section>
      <section id="featured" className="pl-4">
        <Flexbar classes="pr-4" marginTop padderX padderY spaceBetween>
          <Typography heading>Featured</Typography>
          <Button
            // icon="chevron"
            paddingX="6"
            buttonStyles={{ background: "#7289DA" }}
            title="see all"
          ></Button>
        </Flexbar>
        <ScrollView marginY horizontal>
          {articles.map(item => (
            <a key={item.slug} href={`/articles/${item.slug}`}>
              <Card gutter color="#353535" cardImage={item.feature_image}>
                <Flexbar padderY padderX col>
                  <BarItem col>
                    <Typography cardTitle>{item.title}</Typography>
                    <Typography cardSubHeading>
                      {ReactHtmlParser(item.custom_excerpt)}
                    </Typography>
                  </BarItem>
                </Flexbar>
                {/* <Flexbar>
                <BarItem>
                  <a href="https://app.netlify.com/start/deploy?repository=https://github.com/atrimn/arsenalOS-templateOne">
                    <img
                      src="https://www.netlify.com/img/deploy/button.svg"
                      alt="Deploy to Netlify"
                    />
                  </a>
                </BarItem>
              </Flexbar> */}
              </Card>
            </a>
          ))}
        </ScrollView>
      </section>
      <section id="places" className="px-4 h-auto">
        <Separator />
        <Flexbar marginY padderX padderY spaceBetween>
          <Typography heading>Blog</Typography>
        </Flexbar>
        {places.length ? (
          <Card
            bgImage={places[0].main_picture}
            displayFlex
            gradient
            fullWidth
            height="64"
            paddingX="4"
          >
            <BarItem justify="center" grow>
              <Typography cardHeading>{places[0].headline}</Typography>
              <Typography cardBody>{places[0].description}</Typography>
              <Flexbar padderY>
                <MdLocationOn className="mr-1" color="#AAAAAA"></MdLocationOn>
                <Typography spacing cardSubHeading>
                  {places[0].city}
                </Typography>
                <Typography spacing cardSubHeading>
                  ${places[0].price}
                </Typography>
                <Typography
                  opacity="opacity-25"
                  spacing
                  textDecor="line-through"
                  cardSubHeading
                >
                  ${places[0].price_old}
                </Typography>
              </Flexbar>
            </BarItem>
          </Card>
        ) : null}
        <ScrollView vertical marginY>
          {places.slice(1).map(item => (
            <Card
              key={item.main_picture}
              color="#353535"
              horizontal={true}
              gutter
              cardImage={item.main_picture}
              paddingX="2"
              paddingY="4"
              displayFlex
              fullWidth
              align="center"
              height="24"
            >
              <CardBody>
                <MdMoreVert
                  style={{
                    position: "absolute",
                    top: 15,
                    right: 0,
                    color: "white",
                    opacity: 0.25,
                  }}
                  size={"1.5em"}
                ></MdMoreVert>
                <Typography cardTitle>{item.headline}</Typography>
                <Flexbar>
                  <Typography spacing cardSubHeading>
                    ${item.price}
                  </Typography>
                  <Typography
                    opacity="opacity-25"
                    spacing
                    textDecor="line-through"
                    cardSubHeading
                  >
                    ${item.price_old}
                  </Typography>
                </Flexbar>
                <Flexbar spaceBetween padderY>
                  <BarItem align="center" row>
                    <MdLocationOn
                      className="mr-1"
                      color="#AAAAAA"
                    ></MdLocationOn>
                    <Typography opacity="1" cardBody>
                      {item.city}
                    </Typography>
                  </BarItem>
                  <BarItem align="center" spaceBetween row>
                    <FaRegHeart className="mr-1" color="#AAAAAA"></FaRegHeart>
                    <Typography opacity="1" cardBody>
                      782
                    </Typography>
                    <MdModeComment
                      color="#AAAAAA"
                      className="mx-1"
                    ></MdModeComment>
                    <Typography opacity="1" cardBody>
                      244
                    </Typography>
                  </BarItem>
                </Flexbar>
              </CardBody>
            </Card>
          ))}
        </ScrollView>
        {/* <Flexbar row></Flexbar>  */}
      </section>
    </Layout>
  )
}

export default IndexPage
