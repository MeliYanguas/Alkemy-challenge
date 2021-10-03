/* eslint-disable no-alert */
/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';

import { API_HEROES } from '../API_HEROES';

import './Style.css';

const Home = () => {
  // ---------------- todo lo referido a la busqueda
  const [heroesResults, setHeroesResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm === '') {
      alert('ingrese un nombre');
    } else {
      axios
        .get(`${API_HEROES}/search/${searchTerm}`)
        .then((res) => setHeroesResults(res.data.results));
    }
  };

  let requestSuccessfully = false;

  if (heroesResults !== undefined) {
    requestSuccessfully = true;
  }

  //-------------------------------------

  const [team, setTeam] = useState({
    good: [],
    bad: [],
  });

  let teamID = [];

  if (team) {
    teamID = [...team.good, ...team.bad].map((h) => h.id);
  }

  const addMember = (hero) => {
    if (team.good.length + team.bad.length === 6) {
      alert('equipo completo');
    }

    if (hero.biography.alignment === 'good') {
      if (team.good.length < 3) {
        setTeam({
          ...team,
          good: [...team.good, hero],
        });
      } else {
        alert('hay demasiados buenos en el equipo');
      }
    } else if (hero.biography.alignment === 'bad') {
      if (team.bad.length < 3) {
        setTeam({
          ...team,
          bad: [...team.bad, hero],
        });
      } else {
        alert('hay demasiados malos en el equipo');
      }
    } else {
      alert('heroe neutral');
    }
  };

  //-----------------------------
  const removeMember = (hero) => {
    const {
      biography: { alignment },
    } = hero;
    const { good, bad } = team;

    if (alignment === 'good') {
      setTeam({
        bad,
        good: good.filter((h) => h.id !== hero.id),
      });
    } else {
      setTeam({
        good,
        bad: bad.filter((h) => h.id !== hero.id),
      });
    }
  };

  //-----------------------

  let group = [];
  group = [...team.good, ...team.bad];

  let powerstats = {};
  powerstats = group.map((i) => i.powerstats);

  // eslint-disable-next-line no-console
  console.log(powerstats);

  // let {intelligence, strength, speed, durability, power, combat}= powerstats

  console.log(powerstats);

  

  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          className="textField"
          placeholder="Search hero..."
          onChange={handleSearch}
          value={searchTerm}
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Buscar
        </button>
      </div>

      <div>
        <h1 className="my-5">Equipo de heroes</h1>

        <div className="container ">
          <div className="d-flex justify-content-center row">
            {team.good.map((hero) => (
              <Card
                key={hero.id}
                hero={hero}
                isMember
                addMember={addMember}
                removeMember={removeMember}
              />
            ))}

            {team.bad.map((hero) => (
              <Card
                key={hero.id}
                hero={hero}
                isMember
                addMember={addMember}
                removeMember={removeMember}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        {requestSuccessfully ? (
          <div className="container">
            {/* eslint-disable-next-line eqeqeq */}
            {heroesResults != '' ? (
              <h3 className="mt-5 mb-2">Resultados:</h3>
            ) : (
              ''
            )}
            <div className="d-flex justify-content-center row">
              {heroesResults.map((hero) => (
                <Card
                  key={hero.id}
                  hero={hero}
                  isMember={teamID.includes(hero.id)}
                  addMember={addMember}
                  removeMember={removeMember}
                />
              ))}
            </div>
          </div>
        ) : (
          'no hay resultados'
        )}
      </div>
    </div>
  );
};

export default Home;
