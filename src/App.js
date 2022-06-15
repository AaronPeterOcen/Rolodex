import { useState, useEffect } from "react";
import "./App.css";
import Cardlist from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/searchbox.components";

const App = () => {
  const [searchField, setsearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);
  // const [stringField, setStringField] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onsearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setsearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title"> ROLODEX</h1>

      <SearchBox
        className="-monsters-search-box"
        onChangeHandler={onsearchChange}
        placeholder="search monsters"
      />

      <Cardlist monsters={filteredMonsters} />
    </div>
  );
};

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
//     console.log("componentDidMount");
//     fetch("https://jsonplaceholder.typicode.com/users")
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(() => {
//           return { monsters: users };
//         })
//       );
//   }

//   onsearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     //console.log("render");

//     const { monsters, searchField } = this.state;
//     const { onsearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title"> ROLODEX</h1>
//         {/* {filteredMonsters.map((monster) => {
//           return (
//             <div key={monster.id}>
//               <h1>{msearchonster.name}</h1>
//             </div>
//           );
//         })} */}
//         <SearchBox
//           className="-monsters-search-box"
//           onChangeHandler={onsearchChange}
//           placeholder="search monsters"
//         />
//         <Cardlist monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
