import createTable from '../src/db/createTable'

exports.up = (knex) => {
  return createTable('users', knex, (table) => {
    table.string('fullname', 30).notNullable()
    table.string('username', 30).notNullable().unique()
    table.string('email', 120).notNullable().unique()
    table.text('passwordHash').notNullable()
    table.string('passwordSalt').notNullable()
    table.text('bio').notNullable()
    table.string('city').notNullable()
    table.string('zipcode').notNullable()
    table.string('country', 2).notNullable()
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('users')
}
