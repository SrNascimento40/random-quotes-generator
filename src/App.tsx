import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";



interface IData {
  quote: string;
  author: string;
}

function App() {
  const [data, setData] = useState<IData>({ quote: "", author: "" });
  const bgColor = ["#ED638D", "#FF956B", "#54C997", "#B9F488"];
  const secondaryColor = ["#F9BCCE", "#FFD2C0", "#B3EED5", "#D6F9BC"];
  const tertiaryColor = ["#983352", "#AA5939", "#277554", "#609732"];
  const [bgColorIndex, setBgColorIndex] = useState(0);

  useEffect(() => {
    handleNewQuote();
  }, []);

  const handleChangeBackgroundColor = () => {
    setBgColorIndex((bgColorIndex + 1) % bgColor.length);
  };

  const handleChangeQuote = () => {
    return new Promise<void>((resolve) => {
      axios
        .get("https://api.api-ninjas.com/v1/quotes?category=art", {
          headers: { "X-Api-Key": "+opXaL5DtVBoYvoKkt8M9Q==YCt6ITEIISpRYraC" },
        })
        .then((response) => response.data)
        .then((data) => {
          setData(data[0]);
          resolve();
        })
        .catch((error) => {
          console.log("error " + error);
        });
    });
  };

  const handleNewQuote = async () => {
    await handleChangeQuote();
    handleChangeBackgroundColor();
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor[bgColorIndex] }}>
      <div id="quote-box" style={{ backgroundColor: secondaryColor[bgColorIndex] }}>
        <div id="quote-text">
          <p id="text">{data.quote}</p>
          <p id="author">- {data.author}</p>
        </div>
        <div id="interactive">
          <div id="share-div">
            <a href="twitter.com" id="insta-quote" target="_blank">
              <AiFillInstagram />
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${data.quote} - ${data.author}`} id="tweet-quote" target="_blank">
              <AiOutlineTwitter />
            </a>
          </div>
          <button
            id="new-quote"
            style={{ backgroundColor: tertiaryColor[bgColorIndex] }}
            onClick={handleNewQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
