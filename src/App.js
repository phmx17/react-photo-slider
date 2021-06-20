import React, { useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';

function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0)

  // cycling: if index < 0 make it last index and vice versa
  useEffect(()=> {
    let lastIndex = people.length -1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  })

  // add timer to advance every 3 seconds
  useEffect(()=> {
    let slider = setInterval(()=> {
      setIndex(index +1)
    }, 3000)
    return ()=> clearInterval(slider) // clear the timer, otherwise new timers get added when clicking on prev and next
  }, [index])

  return <section className="section">
    <div className="title">
      <h2>
        <span>/</span>reviews
      </h2>
    </div>
    {/* people visibility */}
    <div className="section-center">
      {people.map((person, personIndex) => {
        const { id, image, name, title, quote } = person
        // applying slider classes; imagine a moveable viewport(personIndex) and a filmstrip(index)
        let position = 'nextSlide'  // default all to the left of center display
        if (personIndex == index) { // if there is overlap in center, show slide as active
          position = 'activeSlide'
        }
        if (personIndex == index -1 || (index == 0 && personIndex == people.length -1)) { // if filmstrip advanced by 1 frame or viewport shifted to right by 1 frame
          position = 'lastSlide'  // then position is to the right of center display
        }

        return <article key={id} className={position}>
          <img src={image} className="person-img" alt={name}/>       
            <h4>{name}</h4>        
          <p className="title">{title}</p>
          <p className="text">{quote}</p>
          <FaQuoteRight className="icon" />
        </article>
      })}
      <button className="prev" onClick={()=> setIndex(index -1)} ><FiChevronLeft /></button>
      <button className="next" onClick={()=> setIndex(index +1)}><FiChevronRight/></button>
    </div>
  </section>;
}

export default App;
