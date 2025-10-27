import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

console.log("Banco de teste utilizado:", process.env.DATABASE_URL);
