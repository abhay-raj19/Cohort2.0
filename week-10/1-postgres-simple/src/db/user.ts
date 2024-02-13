import { client } from "..";

/* 
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    // await client.connect()
    await client.query(`INSERT INTO users (username,password,name) VALUES ($1,$2,$3) RETURNING *`,[username,password,name])

}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    // await client.connect()
    const getuser = await client.query('SELECT * from users WHERE id=$1',[userId]);
    return getuser.rows[0];
    
    
}

