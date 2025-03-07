/* eslint-disable @typescript-eslint/no-explicit-any */
type SimpleFilterObject = {
    [key: string]: string | number | boolean | ComplexFilter
  }
  
  type ComplexFilter = {
    select?: { [key: string]: boolean }
    include?: { [key: string]: boolean } // Define what include should look like if different
  }
  
  function convertTopLevelStringBooleans(
    filters: SimpleFilterObject
  ): SimpleFilterObject {
    const result: SimpleFilterObject = {}
    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === 'string') {
        // Check if the string is 'true' or 'false' and convert accordingly
        if (value.toLowerCase() === 'true') {
          result[key] = true
        } else if (value.toLowerCase() === 'false') {
          result[key] = false
        } else {
          // Retain other strings as they are
          result[key] = value
        }
      } else if (typeof value === 'object') {
        if (value['select']) {
          const selectValue: string = value['select'] as unknown as string
          const splitArray: string[] = selectValue.split('-')
          const select: any = {}
          for (const i in splitArray) {
            select[`${splitArray[i]}`] = true
          }
          result[key] = { select: select }
        } else if (value['include']) {
          const includeValue: string = value['include'] as unknown as string
          const splitArray: string[] = includeValue.split('-')
          const include: any = {}
          for (const i in splitArray) {
            include[`${splitArray[i]}`] = true
          }
          result[key] = { include: include }
        }
      }
    }
    return result
  }
  
  // Export the function
  export default convertTopLevelStringBooleans
  