const { group } = require('console')
const fs = require('fs')

/**
 * Get file names and filter those file which name start with _ or name is REAMDME.md
 * @param {string} path directory path
 * @returns {Array} filesName
 */
function getFileNames(path) {
  try {
    const filesName = fs
      .readdirSync(path, { withFileTypes: true })
      .filter(
        (item) =>
          item.isFile() &&
          !item.name.startsWith('_') &&
          item.name.endsWith('.md') &&
          item.name !== 'README.md'
      )
      .map((item) => {
        const name = item.name
        return name.substr(0, name.lastIndexOf('.'))
      })
    // console.log(filesName, path)
    return filesName
  } catch (err) {
    process.env.NODE_ENV !== 'production' && console.error(err)
  }
  return []
}

/**
 * Get file names by groups via file file prefix to recognize
 * For example:
 * files: 1_1.xxx.md, 1_2.xxx.md, 1_3.xxx.md are the same group
 * and    2_1.xxx.md, 2_2.xxx.md is another group
 *
 * @param {string} path directory path
 * @param {string[]} groupNames group name array
 * @returns { Object } { groupName: fileNames } filesNames is an string array
 */
function getFileNamesByGroups(path, groupNames) {
  const fileNames = getFileNames(path)
  if (fileNames.length === 0) return {}
  // console.log(fileNames)
  const groups = setGroups(fileNames)
  const merge = mergeGroups(groups, groupNames)
  return merge
}

/**
 * set group.
 * @param {Array<string>} fileNames
 * @returns {Object} { groupId1: [...fileNames], groupIndexes: [groupId1]}
 */
function setGroups(fileNames) {
  const groups = Object.create(null)
  groups.groupIndexes = []
  let groupId
  let groupIdIndex = -1

  for (let i = 0, len = fileNames.length; i < len; ++i) {
    const name = fileNames[i]
    groupIdIndex = name.indexOf('_')
    if (groupIdIndex === -1) continue
    groupId = name.substr(0, groupIdIndex)
    if (!groups[groupId]) {
      groups[groupId] = [name]
      groups.groupIndexes.push(groupId)
    } else {
      groups[groupId].push(name)
    }
  }

  // console.log(groups)
  return groups
}

/**
 *
 * @param {Object} groups { groupId1: [...fileNames], groupIndexes: [groupId1]}
 * @param {Array<string>} groupNames
 */
function mergeGroups(groups, groupNames = []) {
  const groupIndexes = groups.groupIndexes
  const result = Object.create(null)
  if (!groupIndexes) return result

  groupIndexes.forEach((groupId, index) => {
    const groupName = groupNames[index] || groupId
    result[groupName] = groups[groupId]
  })
  return result
}

module.exports = {
  getFileNames,
  getFileNamesByGroups
}
