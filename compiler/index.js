/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const package = require('../package.json')
const { compile } = require('nexe')
const ResEdit = require('resedit')
const fs = require('fs')
const path = require('path')

compile({
  input: path.resolve(process.cwd() + '/dist/index.js'),
  output: path.resolve(process.cwd() + '/build/bewss-compiled'),
  target: '14.15.3',
  build: true,
  patches: [
    async (compiler, next) => {
      await compiler.setFileContentsAsync(
        'lib/new-native-module.js',
        'module.exports = 42',
      )
      
      return next()
    },
  ],
}).then(() => {
  modifyBuild()
})

function modifyBuild() {
  let data = fs.readFileSync(path.resolve(process.cwd() + '/build/bewss-compiled.exe'))
  let exe = ResEdit.NtExecutable.from(data)
  let res = ResEdit.NtExecutableResource.from(exe)
  let iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(path.resolve(process.cwd() + '/icon.ico')))

  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    101,
    1033,
    iconFile.icons.map((item) => item.data),
  )

  let viList = ResEdit.Resource.VersionInfo.fromEntries(res.entries)
  let vi = viList[0]
  vi.fixedInfo.fileVersionMS = 0x10001
  vi.fixedInfo.fileVersionLS = 0
  vi.setStringValues(
    {
      lang: 1033,
      codepage: 1200, 
    },
    {
      FileDescription: package.description,
      FileVersion: package.version,
      ProductName: package.name,
    },
  )
  vi.outputToResourceEntries(res.entries)

  res.outputResource(exe)
  let newBinary = exe.generate()
  fs.writeFileSync(path.resolve(process.cwd() + '/build/bewss-windows.exe'), new Buffer.from(newBinary))
  console.log('\n\nBuild Completed!')
}
