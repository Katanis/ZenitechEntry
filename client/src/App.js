import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './App.css';

function App() {
  const [items, setItems] = useState(Array.from({ length: 0 }));
  const [hasMore, setHasMore] = useState(true);

  function callAPI() {
    // if (items.length >= 100) {
    //   setHasMore(false);
    // }//Uncoment if you like to limit photos to render

    setTimeout(async () => {
      const data = await fetch("http://localhost:9000/testAPI")
        .then(res => res.text());
      setItems([...items, ...JSON.parse(data)])
    }, 1500);//Imitating loading

  }

  useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setItems(JSON.parse(res)));
  }, [])

  return (
    <div className="App">
      <InfiniteScroll
        dataLength={Object.entries(items).length}
        next={callAPI}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {Object.entries(items).map((i, index) => (
          <div className='card' style={style.card} key={index}>
            <img style={style.picture} src={i[1].download_url} />
            <p>Author: <span style={style.author}>{i[1].author}</span></p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

const style = {
  container: {
    felxDirection: 'column',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    height: 'auto',
    width: '300px',
    border: "3px solid #736D6D",
    borderRadius: '15px',
    margin: '30px auto',
    padding: 8,
    alignSelf: 'center',
    justifyContent: 'space-between',
    
  },
  picture: {
    height: '150px',
    width: '200px',
    borderRadius: '15px'
  },
  author: {
    color: '#BDB5B5',
    fontSize: '12px',
    fontWeight: 'bold',
  }

};

export default App;
