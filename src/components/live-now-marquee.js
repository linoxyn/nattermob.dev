import React, { useCallback, useEffect, useState } from "react"

const makeRandomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff)
  return `#${`000000${hex.toString(16)}`.substr(-6)}`
}

const makeLettersArray = (text) => {
  return text.split("")
}

const LiveNowMarquee = () => {
  const colorString = "LIVE NOW | https://www.youtube.com/raaecodes"
  const [isMounted, setIsMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [color, setColor] = useState("#32ee7f")
  const [lettersArray, setLettersArray] = useState([])
  const [colorsArray, setColorsArray] = useState([])
  const [marqueeColors, setMarqueeColors] = useState([])

  const changeUpColors = useCallback(
    (madeColor) => {
      if (lettersArray) {
        colorsArray.splice(0, 0, madeColor)
        colorsArray.splice(-1, 1)
        const allNewColors = [...colorsArray]
        setMarqueeColors(allNewColors)
      }
    },
    [colorsArray, lettersArray]
  )

  const makeColor = useCallback(() => {
    const madeColor = makeRandomColor()
    setColor(madeColor)
    changeUpColors(madeColor)
    return madeColor
  }, [changeUpColors])

  useEffect(() => {
    const lettersArray = makeLettersArray(colorString)
    const colorsArray = lettersArray.map(makeRandomColor)
    setLettersArray(lettersArray)
    setColorsArray(colorsArray)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      makeColor()
    }, 255)
    return () => {
      clearInterval(interval)
    }
  }, [makeColor])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const reduceQuery = window.matchMedia("(prefers-reduced-motion:reduce)")
    const handleChange = (event) => {
      setPrefersReducedMotion(!event.matches)
    }
    reduceQuery.addEventListener("change", handleChange)

    return () => {
      reduceQuery.removeEventListener("change", handleChange)
    }
  }, [isMounted])

  return (
    <>
      {isMounted ? (
        <a
          href="https://www.youtube.com/raaecodes"
          rel="noreferrer"
          target="_blank"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gridTemplateColumns: "auto 1fr",
              border: "4px solid #ff000090",
              padding: "5px",
            }}
          >
            <span
              style={{
                backgroundColor: color,
                border: "2px solid #ff000090",
                borderRadius: "50px",
                display: "block",
                height: "1.5rem",
                marginRight: "0.25rem",
                width: "1.5rem",
              }}
              aria-label="Red Circle"
              role="img"
            />
            <marquee
              style={{
                fontWeight: 600,
                fontSize: "1.36rem",
              }}
            >
              {lettersArray.map((letter, i) => (
                <span style={{ color: marqueeColors[i] }} key={`letter${i}`}>
                  {letter}
                </span>
              ))}
            </marquee>
          </div>
          <p>{prefersReducedMotion}</p>
        </a>
      ) : null}
    </>
  )
}

export default LiveNowMarquee
