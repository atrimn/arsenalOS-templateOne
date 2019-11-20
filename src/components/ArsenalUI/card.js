import React from "react"

//clean this up and document it

const CardImage = ({ horizontal, cardImage }) => {
  const imgWidth = horizontal
    ? "w-24 rounded-lg h-20"
    : " h-40 object-cover rounded-lg w-full"
  return <img className={`${imgWidth}`} src={cardImage} />
}

// used for horizontal cards
export const CardBody = ({ children }) => {
  return <div className="px-4 pt-2 flex-1 flex-col">{children}</div>
}

export default ({
  children,
  cardImage,
  gutter,
  color,
  gradient,
  fullWidth,
  height,
  displayFlex,
  paddingX,
  paddingY,
  justify,
  bgImage,
  horizontal,
  align,
}) => {
  const gutterRight = gutter ? (horizontal ? "my-2" : "mr-4") : null
  const width = fullWidth ? "w-full" : "w-10/12"
  const maxWidth = fullWidth ? "" : "max-w-xs"
  const cardHeight = height ? `h-${height}` : "h-full"
  const display = displayFlex ? "flex" : "block"
  const paddingPx = paddingX ? `px-${paddingX}` : ""
  const paddingPY = paddingY ? `py-${paddingY}` : ""

  let justifyDir
  let alignDir
  // let image

  // turn this into helper function
  switch (justify) {
    case "left":
      justifyDir = "justify-start"
      break
    case "right":
      justifyDir = "justify-end"
      break
    case "center":
      justifyDir = "justify-center"
      break
    case "around":
      justifyDir = "justify-around"
      break
    default:
      justifyDir = ""
      break
  }
  switch (align) {
    case "left":
      alignDir = "items-start"
      break
    case "right":
      alignDir = "items-end"
      break
    case "center":
      alignDir = "items-center"
      break
    default:
      alignDir = ""
      break
  }

  // if (bgImage) {
  // }

  let gradientColor
  if (gradient) {
    gradientColor = {
      background:
        "linear-gradient(25.02deg, rgb(114, 137, 218) 19.6%, rgb(114, 137, 218) 72.68%, rgb(114, 137, 218) 92.75%), #F4327F",
      boxShadow: "0px 80px 120px rgba(0, 0, 0, 0.05)",
    }
  }
  return (
    <div
      style={{
        minWidth: 200,
        maxWidth: maxWidth ? 200 : null,
        scrollSnapAlign: "start",
        background: color,
        ...gradientColor,
      }}
      className={`relative cursor-pointer ${paddingPY} ${alignDir} ${gutterRight} ${justifyDir} ${paddingPx} ${display} ${cardHeight} overflow-hidden bg-white ${maxWidth}    ${width} rounded-lg`}
    >
      {cardImage ? (
        <CardImage cardImage={cardImage} horizontal={horizontal} />
      ) : null}
      {bgImage ? (
        <img
          style={{ opacity: 0.1 }}
          className=" absolute object-cover object-top h-full w-full top-0 left-0 right-0  z-1"
          src={bgImage}
          alt="background image"
        />
      ) : null}
      {children}
    </div>
  )
}
