import mysql from 'mysql2'
import bcrypt from 'bcrypt'

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'ecommerceapp'
}).promise()



// export async function getItem(id){
//     const [rows] = await pool.query(
//         `SELECT * FROM przedmioty WHERE id  = ?`, [id])
//         return rows[0]
// }

// export async function createItem(nazwa,cena,opis){
//     const [result] = await pool.query(`
//         INSERT INTO przedmioty (nazwa,cena,opis) VALUES (?,?,?)`, [nazwa,cena,opis])
//         const id = result.insertId
//         return getItem(id)
// }

// export async function getItems() {
//     const [rows] = await pool.query(
//         "SELECT * FROM przedmioty")
//         return rows
// }

export async function registerUser(Imie, Nazwisko, Email, Haslo) {
    const hashedPassword = await bcrypt.hash(Haslo, 10);
    const [result] = await pool.query(`
        INSERT INTO Uzytkownicy (Imie, Nazwisko, Email, Haslo) VALUES (?, ?, ?, ?)`, [Imie, Nazwisko, Email, hashedPassword]);
        return result;
  }
  
export async function loginUser(Email) {
    const [rows] = await pool.query(`
        SELECT * FROM Uzytkownicy WHERE Email = ?`, [Email]);
        return rows;
  }


export async function addProduct(NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) {
    const [result] = await pool.query(`
        INSERT INTO Produkty (NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) VALUES (?, ?, ?, ?, ?, ?)`, 
        [NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu])
        const id = result.insertId
        return getProduct(id);
  }
  
  export async function editProduct(ProduktID, NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) {
    const [rows] = await pool.query(`
        UPDATE Produkty SET NazwaProduktu = ?, OpisProduktu = ?, Cena = ?, Dostepnosc = ?, KategoriaID = ?, ZdjecieProduktu = ? WHERE ProduktID = ?`, 
        [NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu, ProduktID]);
        return rows;
  }
  
  export async function deleteProduct(ProduktID) {
    const [deleted] = await pool.query(`
        DELETE FROM Produkty WHERE ProduktID = ?`, [ProduktID]);
        return deleted;
  }
  
  export async function getProduct(ProduktID) {
    const [rows] = await pool.query(`
        SELECT * FROM Produkty WHERE ProduktID = ?`, [ProduktID]);
        return rows[0];
  }

  export async function getProducts() {
    const [rows] = await pool.query(`
        SELECT * FROM Produkty`)
        return rows
  }

