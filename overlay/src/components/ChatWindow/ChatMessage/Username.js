import React from 'react';
import superficial from 'superficial';

const BASE_URL = 'https://static-cdn.jtvnw.net/badges/v1/';
const BADGE_URLS = {
  broadcaster: `${BASE_URL}5527c58c-fb7d-422d-b71b-f309dcb85cc1/1`,
  moderator: `${BASE_URL}3267646d-33f0-4b17-b3df-f923a41db1d0/1`,
  premium: `${BASE_URL}a1dd5073-19c3-4911-8cb4-c464a7bc1510/1`,
};

const colorCache = {
  cheerskevin: '#d83ec4',
  'Twoverlay Chat': '#ff60f3',
};

function Username(user, looks) {
  const name = user['display-name'] || user.username;
  const color = userColor(user, name);
  return (
    <span>
      <span>
        {
          user.badges && Object.keys(user.badges)
            .map(badge => BADGE_URLS[badge])
            .filter(src => src)
            .map(src =>
              <img
                alt="badge"
                key={src}
                {...{ src }}
              />
            )
        }
      </span>
      {' '}
      <span looks={looks.name} style={{ color }}>{ name }</span>
    </span>
  );
}

function userColor({ color }, name) {
  if (color) return color;
  if (!colorCache[name]) colorCache[name] = nextColor();
  return colorCache[name];
}

function nextColor() {
  return `hsl(${(Object.keys(colorCache).length * 70) % 360}, 100%, 60%)`;
}

Username.looks = {
  name: { fontWeight: 'bold' },
};

export default superficial(Username);
