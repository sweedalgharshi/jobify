const { readFileSync } = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const mongoConnect = require('./db/connect');
const Job = require('./models/Job');

const start = async () => {
  try {
    await mongoConnect();
    await Job.deleteMany();

    const jsonProducts = JSON.parse(
      await readFileSync('./mock-data.json', 'utf-8')
    );

    await Job.create(jsonProducts);
    console.log('Successs');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
