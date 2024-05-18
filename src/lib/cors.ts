// eslint-disable-next-line import/no-extraneous-dependencies
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
  origin: ['http://localhost:3000', 'http://localhost:3000/api/get-calculation'],
});

export default cors;
