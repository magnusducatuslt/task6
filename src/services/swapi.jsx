import React from "react";
import axios from "axios";
import Faker from "faker";
export const swapiApi = async (target) => {
  try {
    const {
      data: { results },
    } = await axios.get(`http://swapi.dev/api/${target}/`);
    return results;
  } catch (e) {
    return {
      people: [
        {
          id: Faker.random.uuid(),
          first: Faker.internet.userName(),
          last: Faker.internet.userName(),
          handle: Faker.internet.email(),
        },
        {
          id: Faker.random.uuid(),
          first: Faker.internet.userName(),
          last: Faker.internet.userName(),
          handle: Faker.internet.email(),
        },
        {
          id: Faker.random.uuid(),
          first: Faker.internet.userName(),
          last: Faker.internet.userName(),
          handle: Faker.internet.email(),
        },
      ],
      planets: [
        {
          id: Faker.random.uuid(),
          name: Faker.company.companyName(),
          climate: Faker.internet.color(),
          terrain: Faker.internet.domainSuffix(),
          diametr: Faker.finance.mask(),
          population: Faker.finance.amount(),
          created: `${Faker.date.future()}`,
        },
      ],
      starshipsships: [],
    };
  }
};
