const qiniu = require('qiniu')

// 自己可以到"www.qiniu.com" 申请自己的七牛空间
// 这个账号是我的，不是开放的哦
const ACCESS_KEY = "7zKFzYZoRkBPd7H480S3JCBCt0Bl7-mZ_t7isal7";
const SECRET_KEY = "B5wQbLokhb3T_8WYzaMtMfSw3kF8MuIjm4ks3EGr";

export default async function getUploadToken() {
  return new Promise((resolve, reject) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
      scope: "zhangxu-blogs",
      expires: 7200
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      resolve({
        token: uploadToken
      })
    } else {
      // resolve({
      //   token: "122313121"
      // })
      reject()
    }
  })
}

