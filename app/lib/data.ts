import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

// Type definition for Rotation
export type Rotation = {
  id: string;
  cattle_group: string;
  origin_pasture: string;
  destination_pasture: string;
  rotation_date: string;
  days_in_pasture: number;
  observations: string;
  created_at?: string;
};

/**
 * Fetches all rotations ordered by date (most recent first)
 */
export async function fetchRotations() {
  noStore();
  try {
    const data = await sql<Rotation>`
      SELECT 
        id,
        cattle_group,
        origin_pasture,
        destination_pasture,
        TO_CHAR(rotation_date, 'YYYY-MM-DD') as rotation_date,
        days_in_pasture,
        observations,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
      FROM rotations
      ORDER BY rotation_date DESC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rotation data.');
  }
}

/**
 * Fetches a single rotation by ID
 */
export async function fetchRotationById(id: string) {
  noStore();
  try {
    const data = await sql<Rotation>`
      SELECT 
        id,
        cattle_group,
        origin_pasture,
        destination_pasture,
        TO_CHAR(rotation_date, 'YYYY-MM-DD') as rotation_date,
        days_in_pasture,
        observations,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
      FROM rotations
      WHERE id = ${id}
    `;

    if (data.rows.length === 0) {
      return null;
    }

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rotation.');
  }
}

/**
 * Fetches rotations for a specific cattle group
 */
export async function fetchRotationsByGroup(group: string) {
  noStore();
  try {
    const data = await sql<Rotation>`
      SELECT 
        id,
        cattle_group,
        origin_pasture,
        destination_pasture,
        TO_CHAR(rotation_date, 'YYYY-MM-DD') as rotation_date,
        days_in_pasture,
        observations,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
      FROM rotations
      WHERE cattle_group = ${group}
      ORDER BY rotation_date DESC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rotation data for group.');
  }
}

/**
 * Creates a new rotation
 */
export async function createRotation({
  cattle_group,
  origin_pasture,
  destination_pasture,
  rotation_date,
  days_in_pasture,
  observations,
}: {
  cattle_group: string;
  origin_pasture: string;
  destination_pasture: string;
  rotation_date: string;
  days_in_pasture: number;
  observations: string;
}) {
  try {
    await sql`
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
        uuid_generate_v4(),
        ${cattle_group}, 
        ${origin_pasture}, 
        ${destination_pasture}, 
        ${rotation_date}, 
        ${days_in_pasture}, 
        ${observations}
      )
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create rotation.');
  }
}

/**
 * Updates an existing rotation
 */
export async function updateRotation({
  id,
  cattle_group,
  origin_pasture,
  destination_pasture,
  rotation_date,
  days_in_pasture,
  observations,
}: {
  id: string;
  cattle_group: string;
  origin_pasture: string;
  destination_pasture: string;
  rotation_date: string;
  days_in_pasture: number;
  observations: string;
}) {
  try {
    await sql`
      UPDATE rotations
      SET 
        cattle_group = ${cattle_group},
        origin_pasture = ${origin_pasture},
        destination_pasture = ${destination_pasture},
        rotation_date = ${rotation_date},
        days_in_pasture = ${days_in_pasture},
        observations = ${observations}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update rotation.');
  }
}

/**
 * Deletes a rotation by ID
 */
export async function deleteRotation(id: string) {
  try {
    await sql`
      DELETE FROM rotations
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete rotation.');
  }
}

/**
 * Fetches rotations with filtering and pagination
 */
export async function fetchFilteredRotations(
  query: string,
  currentPage: number,
  rowsPerPage: number
) {
  noStore();
  const offset = (currentPage - 1) * rowsPerPage;

  try {
    const rotations = await sql<Rotation>`
      SELECT
        id,
        cattle_group,
        origin_pasture,
        destination_pasture,
        TO_CHAR(rotation_date, 'YYYY-MM-DD') as rotation_date,
        days_in_pasture,
        observations,
        TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI:SS') as created_at
      FROM rotations
      WHERE
        cattle_group ILIKE ${`%${query}%`} OR
        origin_pasture ILIKE ${`%${query}%`} OR
        destination_pasture ILIKE ${`%${query}%`} OR
        observations ILIKE ${`%${query}%`}
      ORDER BY rotation_date DESC
      LIMIT ${rowsPerPage} OFFSET ${offset}
    `;

    return rotations.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered rotations.');
  }
}

/**
 * Counts the total number of rotations (for pagination)
 */
export async function getRotationsCount() {
  noStore();
  try {
    const data = await sql`SELECT COUNT(*) FROM rotations`;
    return parseInt(data.rows[0].count);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rotations count.');
  }
}

/**
 * Gets the last location of a specific cattle group
 */
export async function getLastLocationForGroup(group: string) {
  noStore();
  try {
    const data = await sql`
      SELECT 
        destination_pasture,
        rotation_date,
        days_in_pasture
      FROM rotations
      WHERE cattle_group = ${group}
      ORDER BY rotation_date DESC
      LIMIT 1
    `;

    if (data.rows.length === 0) {
      return null;
    }

    return {
      current_pasture: data.rows[0].destination_pasture,
      rotation_date: data.rows[0].rotation_date,
      days_in_pasture: data.rows[0].days_in_pasture,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch last location for group.');
  }
}
