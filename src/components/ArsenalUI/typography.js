import React from "react"

export default ({
  heading,
  subheading,
  cardHeading,
  cardTitle,
  opacity,
  cardSubHeading,
  heroTitle,
  heroBody,
  textDecor,
  cardBody,
  body,
  button,
  spacing,
  children,
  textStyles,
  titleColor,
  articleBody,
  lg,
}) => {
  if (!children) {
    console.warn("Typography requires inner text")
    return null
  }
  if (heading) {
    return (
      <h2
        style={{ ...textStyles }}
        className="text-white tracking-wide leading-tight text-3xl"
      >
        {children}
      </h2>
    )
  }
  if (subheading) {
    return (
      <h2
        style={{ ...textStyles }}
        className="text-white opacity-25  text-lg leading-none"
      >
        {children}
      </h2>
    )
  }
  if (body) {
    return (
      <p style={{ ...textStyles }} className="text-white  text-base">
        {children}
      </p>
    )
  }
  if (articleBody) {
    return (
      <p
        style={{ ...textStyles }}
        className="text-white tracking-wider text-sm"
      >
        {children}
      </p>
    )
  }
  if (button) {
    return (
      <h2
        style={{ ...textStyles, color: titleColor }}
        className={`text-white leading-none font-light ${
          lg ? "text-lg" : "text-base"
        }`}
      >
        {children}
      </h2>
    )
  }
  if (cardTitle) {
    return (
      <h3
        style={{ ...textStyles }}
        className={`text-white leading-tight text-lg font-medium tracking-wider`}
      >
        {children}
      </h3>
    )
  }
  if (cardHeading) {
    return (
      <h2
        style={{ ...textStyles }}
        className="text-white  tracking-wider leading-tight text-2xl font-normal"
      >
        {children}
      </h2>
    )
  }
  if (cardSubHeading) {
    let opacityVal = opacity ? `${opacity}` : "opacity-50"
    let spacingVal = spacing ? "tracking-widest" : ""
    return (
      <h3
        style={{ ...textStyles }}
        className={`text-white ${textDecor} truncate ${spacingVal} ${opacityVal} leading-snug pr-2  font-light  text-xs`}
      >
        {children}
      </h3>
    )
  }
  if (cardBody) {
    let opacityVal = opacity === "1" ? "opacity-100" : "opacity-50"
    return (
      <h3
        style={{ ...textStyles }}
        className={`text-white leading-relaxed tracking-widest font-light ${opacityVal} text-xs`}
      >
        {children}
      </h3>
    )
  }
  if (heroTitle) {
    return (
      <h3
        style={{ ...textStyles }}
        className={`leading-loose font-bold tracking-widest font-medium text-xl`}
      >
        {children}
      </h3>
    )
  }
  if (heroBody) {
    return (
      <h3
        style={{ ...textStyles }}
        className={`text-white  leading-relaxed tracking-widest font-medium text-base`}
      >
        {children}
      </h3>
    )
  } else {
    console.warn("invalid prop passed to Typography")
    return <p>{children}</p>
  }
}
