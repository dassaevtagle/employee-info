import HttpService from "../Services/HttpService"

const generatePdf = async (username) => {
  try {
    const userInfoResp = await HttpService().getPersonInfo(username)
    console.log(userInfoResp.data) 
  } catch(e) {
    alert(e)
  }
}

export default generatePdf