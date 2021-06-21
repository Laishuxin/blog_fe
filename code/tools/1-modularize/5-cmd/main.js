seajs.use(
  ['module-a.js', 'module-b.js', 'module-c.js'], 
  function (moduleA, moduleB, moduleC) {
    var a = moduleA.a;
    var b = moduleB.b;
    var c = moduleC.c;
    console.log(`commonjs a = ${JSON.stringify(a)}`);
    console.log(`commonjs b = ${JSON.stringify(b)}`);
    console.log(`commonjs c = ${JSON.stringify(c)}`);
  }
);
