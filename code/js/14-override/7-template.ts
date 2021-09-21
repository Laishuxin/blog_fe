export {}
const beard = /\{\{\s*(\w+)\s*\}\}/g
function render(template: string, data: any) {
  if (!template) {
    return ''
  }
  let exec: null | RegExpExecArray = null
  while ((exec = beard.exec(template))) {
    template = template.replace(exec[0], data[exec[1]])
  }
  return template
}

function test1() {
  const template = `I am {{fine}}, thank you.
    You are {{ name }}?
  `
  const data = {
    name: 'John',
    fine: 'hungry',
  }

  const result = render(template, data)
  console.log(result)
}
test1()
