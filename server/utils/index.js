const crypto = require('crypto');

function enCode(data, key, iv) {  // 加密
  const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
  cipher.update(data, 'utf8', 'hex')
  return cipher.final('hex')
}

function deCode(data, key, iv) {  // 解密
  const cipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
  cipher.update(data, 'hex', 'utf8')
  return cipher.final('utf8')
}

module.exports = {
  cipher: {
    deCode,
    enCode
  }
}