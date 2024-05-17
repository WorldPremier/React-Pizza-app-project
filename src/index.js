import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
// import { StrictMode } from "react";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
  {
    name: "Franky Retired",
    ingredients: "Savvy, Intelligent, high IQ, and on point ",
    price: `$  ` + 367009000,
    photoName: "/pizzas/Branding_Profile_Image.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      {/* <> */}
      <Header />
      <Menu />
      <Footer />
      {/* </> */}
    </div>
  );
}

function Menu() {
  const pizzass = pizzaData;
  // Empty arrays are considered truthy value. So it will render component without its main content.
  // const pizzass = [];
  const numPizzas = pizzass.length;
  const photoName = "/pizzas/Branding_Profile_Image.jpg";

  return (
    <main className="menu">
      <h2>Our menu</h2>

      {numPizzas > 0 ? (
        //to avoid leaving any trace in the HTML tree, then use React Fragment, creates Optimizing reconciliation process when updaing the DOM. Because it reduces all the noice from having too manh html elements like divs... etc..
        //Makes perfect sense when Cypress automation looping through arrays where it loops identifying eahch el or by using .eq(num)
        //cypress is a winner here by being flexible  within needng key elements from the UI side, but not on under the hood with DOM trace.
        // in state management, I can use <><Child /></> to [<child />] or back
        <>
          <p>
            Authentic Italian cuisine 6 creative dishes to choose from. All from
            out stone oven, all organic, all delicious. Buen apetittae oo
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza
                // name={pizza.name}
                // photoName={pizza.photoName}
                // ingredients={pizza.ingredients}
                pizzaObj={pizza}
                key={pizza.name}
              />
            ))}
          </ul>
        </>
      ) : (
        // <p>We're still working on our menu. Please come back later :) </p>
        <Profile photoName={photoName} />
      )}
    </main>
  );
}
//  inline styling, external css, sass files, css modules, style components and tailwind css as alternatives.

//function rule, must start with a capital letter and must return a mark up in a form of jsx
/// webpack will automatically retrieve img from public modules.

function Pizza({ pizzaObj }) {
  return (
    // Renders when sold out.
    // <li className="pizza sold-out">
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h2>{pizzaObj.name}</h2>
        <p>{pizzaObj.ingredients}</p>/
        {/* {pizzaObj.soldOut ? <span>"SOLD OUT"</span> : pizzaObj.price} */}
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Header() {
  // console.log(props);

  // when inline styling, remeber to use {{}}, basically turning props into style objects, and the go in as a string val.
  // const newColor = {
  //   color: "red",
  //   fontSize: "48px",
  //   textTransform: "uppercase",
  // };
  const newColor = {};
  return (
    <header className="header">
      <h1 style={newColor}>fast react pizza🍕 Co.</h1>
    </header>
  );
}

function Profile({ photoName, img }) {
  return (
    <purpleDolphin className="purpleDolphin">
      <img style={{ width: 500, height: 600 }} src={photoName} alt={img} />;
    </purpleDolphin>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 23;
  const isOpen = hour >= openHour && hour <= closeHour;
  // console.log(isOpen);

  if (!isOpen)
    return (
      <p>
        Sorry we're closed. Please do come back tomorrow between {openHour}:00
        and {closeHour}:00 when we're open.
      </p>
    );
  return (
    <footer className="footer">
      {isOpen ? (
        // <div className="order">
        //   <p>We're open until {closeHour}:00. Come visit us or order online.</p>
        //   <button className="btn">order</button>
        // </div>
        <Order openHour={openHour} closeHour={closeHour} />
      ) : (
        <div>
          Sorry we're closed. Please do come back tomorrow at {openHour}:00 when
          we're open.
        </div>
      )}
    </footer>
  );
}

function Order({ closeHour, openHour }) {
  // console.log(props);
  return (
    <div className="order ">
      <p>
        We're open between {openHour}:00 and {closeHour}:00 hours. Come visit us
        or order online.
      </p>
      <button className="btn">order</button>
    </div>
  );
}
// React v18
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  // strict mode, during dev, will render compoenent twice to check for bugs and
  // React will check to see if using outdated parts
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
