import objection from 'objection'

import hashPassword from '../../hashPassword'

class User extends objection.Model {
  static get tableName() {
    return 'users'
  }

  async checkPassword(password) {
    const { hash } = hashPassword(password, this.passwordSalt)

    return hash === this.passwordHash
  }

  getSafeFields() {
    return {
      fullname: this.fullname,
      email: this.email,
      created_at: this.created_at,
    }
  }
}

export default User
