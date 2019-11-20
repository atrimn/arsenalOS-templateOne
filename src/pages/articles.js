import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Router } from "@reach/router"
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
import { getFirebase } from "../firebase"
import ReactHtmlParser from "react-html-parser"

const Article = props => {
  const [data, setData] = useState({})
  const bodyEl = document.createElement("html")
  React.useEffect(() => {
    // firebase
    const lazyFirebase = import("firebase/app")
    const lazyFirestore = import("firebase/firestore")

    Promise.all([lazyFirebase]).then(([firebase]) => {
      const firestore = getFirebase(firebase).firestore()
      const data = firestore
        .collection("articles")
        .where("slug", "==", props.id)
        .get()
        .then(querySnapshot =>
          querySnapshot.forEach(doc => {
            setData(doc.data())
          })
        )
    })
  }, [])

  // console.log(props.path.split("/").pop())
  return (
    <div id="article" className="h-screen">
      <section id="hero">
        <div className="relative h-64 bg-gray-200">
          <img
            className="absolute z-1 h-full w-full object-cover"
            src={data.feature_image}
            alt=""
          />
          <div
            style={{ background: "rgba(34, 34, 34, 0.75)" }}
            className="absolute z-10 h-full w-full"
          />
        </div>
      </section>
      <section id="body" className="px-2 py-4">
        <Typography cardTitle>{data.title}</Typography>
        <Typography cardBody>Reading Time {data.reading_time}</Typography>
        <div className="py-4 text-white">
          {ReactHtmlParser(data.custom_excerpt)}
        </div>
      </section>
    </div>
  )
}

const ArticlesPage = () => {
  return (
    <Layout>
      <SEO title="Articles" />
      <Router>
        <Article path="/articles/:id" />
      </Router>
    </Layout>
  )
}

export default ArticlesPage
