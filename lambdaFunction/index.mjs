const fileProcessingService = require('./file-processing-service')
const util = require('./util')
const fileUploadPath = require('/fileupload')

export const handler = async (event) => {
  console.log('Request Event ', event)
  let response
  
  switch(true){
    case event.httpMethod === 'POST' === event.path === fileUploadPath:
      response = await fileProcessingService.process(event.body)
      break
    default:
      response = util.buildResponse(404)
  }
  return response
};
