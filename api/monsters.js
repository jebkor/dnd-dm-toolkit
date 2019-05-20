const Pool = require('pg').Pool
const pool = new Pool({
	connectionString: 'postgres://xynimuhc:GfoJ1wv9OQgNrMk2pj4hJGabL3SjCMZB@manny.db.elephantsql.com:5432/xynimuhc'
})
const getMonsters = (request, response) => {
	pool.query('SELECT * FROM monsters ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}



// const getUserById = (request, response) => {
// 	const id = parseInt(request.params.id)

// 	pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
// 		if (error) {
// 			throw error
// 		}
// 		response.status(200).json(results.rows)
// 	})
// }



const createMonster = (request, response) => {
	const {
		name,
		isbossmonster,
		currenthitpoints,
		maxhitpoints,
		legendaryaction,
		legendaryresistances
	} = request.body

	pool.query('INSERT INTO monsters (name, isbossmonster, currenthitpoints, maxhitpoints, legendaryaction, legendaryresistances) VALUES ($1, $2, $3, $4, $5, $6)', [name, isbossmonster, currenthitpoints, maxhitpoints, legendaryaction, legendaryresistances], (error, results) => {
		if (error) {
			throw error
		}
		response.status(201).send(`Monster added with ID: ${results.insertId}`)
	})
}



// const updateUser = (request, response) => {
// 	const id = parseInt(request.params.id)
// 	const {
// 		name,
// 		email
// 	} = request.body

// 	pool.query(
// 		'UPDATE users SET name = $1, email = $2 WHERE id = $3',
// 		[name, email, id],
// 		(error, results) => {
// 			if (error) {
// 				throw error
// 			}
// 			response.status(200).send(`User modified with ID: ${id}`)
// 		}
// 	)
// }



const deleteMonster = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM monsters WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`Monster deleted with ID: ${id}`)
	})
}



module.exports = {
	getMonsters,
	// getUserById,
	createMonster,
	// updateUser,
	deleteMonster,
}