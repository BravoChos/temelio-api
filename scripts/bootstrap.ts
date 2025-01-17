import inquirer from 'inquirer';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
// import { populateData } from './populate-data';

// Load the appropriate .env file based on NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV || 'dev'}` });

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Change the path accordingly
const initTablesPath = '../src/database/bootstrap/initial_schema.sql';
const dropTablesPath = '../src/database/bootstrap/drop_table.sql';

async function runSQL(filePath: string) {
  try {
    const sql = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
    console.log(`Running SQL file: ${filePath}`);
    await pool.query(sql);
    console.log('SQL file executed successfully. \u{1F680}');
  } catch (error) {
    console.error('Error running SQL file:', error);
  } finally {
    await pool.end();
  }
}

async function main() {
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Welcome to Temelio CLI Tool! (Built by Song Cho) \u{1F600}',
  );

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What do you want to do? Choose one!',
      choices: [
        { name: 'Generate new DB tables', value: 'generate_tables' },
        // { name: 'Populate mock data', value: 'populate_mock_data' },
        { name: 'Remove DB tables', value: 'remove_tables' },
        // { name: 'Run insert query', value: 'run_insert_query' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  switch (answers.option) {
    case 'generate_tables':
      console.log('\x1b[36m%s\x1b[0m', 'Generating new tables...');
      runSQL(initTablesPath).catch((err) => console.error(err));
      break;

    // case 'populate_mock_data':
    //   const { count } = await inquirer.prompt([
    //     {
    //       type: 'number',
    //       name: 'count',
    //       message: 'How many users do you want to populate?',
    //       validate: (value) => {
    //         if (value !== undefined && value > 0) return true;
    //         return 'Please enter a positive number.';
    //       },
    //     },
    //   ]);
    //   console.log('\x1b[36m%s\x1b[0m', `Populating ${count} users...`);
    //   populateData(count);
    //   break;

    case 'remove_tables':
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Removing tables... \u{26A0}\u{26A0}\u{26A0}',
      );
      runSQL(dropTablesPath).catch((err) => console.error(err));
      break;

    case 'exit':
      console.log('\x1b[36m%s\x1b[0m', 'Goodbye! Come back soon! \u{1FAE1}');
      process.exit(0);
  }
}

main().catch((error) => {
  console.error('\x1b[41m\x1b[37m%s\x1b[0m', 'An error occurred:', error);
  process.exit(1);
});
