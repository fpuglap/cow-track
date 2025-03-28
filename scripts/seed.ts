import { db, VercelPoolClient } from '@vercel/postgres';
import { users } from '@/app/lib/placeholder-data';
import { rotations } from '@/app/lib/placeholder-data';
import bcrypt from 'bcryptjs';

async function seedUsers(client: VercelPoolClient) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedRotations(client: VercelPoolClient) {
  try {
    // Create the "rotations" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rotations (
        id UUID PRIMARY KEY,
        cattle_group VARCHAR(255) NOT NULL,
        origin_pasture VARCHAR(255) NOT NULL,
        destination_pasture VARCHAR(255) NOT NULL,
        rotation_date DATE NOT NULL,
        days_in_pasture INTEGER,
        observations TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "rotations" table`);

    // Insert data into the "rotations" table
    const insertedRotations = await Promise.all(
      rotations.map(async (rotation) => {
        return client.sql`
          INSERT INTO rotations (
            id, 
            cattle_group, 
            origin_pasture, 
            destination_pasture, 
            rotation_date, 
            days_in_pasture, 
            observations
          )
          VALUES (
            ${rotation.id}, 
            ${rotation.cattle_group}, 
            ${rotation.origin_pasture}, 
            ${rotation.destination_pasture}, 
            ${rotation.rotation_date}, 
            ${rotation.days_in_pasture}, 
            ${rotation.observations}
          )
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Seeded ${insertedRotations.length} rotations`);

    return {
      createTable,
      rotations: insertedRotations,
    };
  } catch (error) {
    console.error('Error seeding rotations:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await seedRotations(client);
  client.release();
  console.log('Seed process completed.');
  process.exit(0);
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
  process.exit(1);
});
