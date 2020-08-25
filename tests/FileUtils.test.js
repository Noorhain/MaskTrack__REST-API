const FileUtils = require('../src/utils/FileUtils')

test('stringifyBase64Test', () => {
    const data = new Buffer.from('Pruebas', 'utf8')
    const stringifiedData = FileUtils.stringifyBase64(data)
    expect(data).toBeInstanceOf(Buffer)
    expect(typeof stringifiedData).toEqual('string')
})