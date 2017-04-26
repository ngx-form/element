
import nodeResolve  from 'rollup-plugin-node-resolve';
import commonjs     from 'rollup-plugin-commonjs';
import uglify       from 'rollup-plugin-uglify';

export default {
  entry: 'dist/index.js',
  dest: 'dist/bundle.umd.js',
  exports: 'named',
  sourceMap: false,
  format: 'umd',
  moduleName: '@ngx-form/element',
  onwarn,
  plugins: [
      commonjs({
          include: 'node_modules/rxjs/**',
      }),
      nodeResolve({ jsnext: true, module: true }),
      uglify()  
  ],
  globals: {
    '@angular/core': 'ng.core'
  }
};

function onwarn(message) {
  const suppressed = [
    'UNRESOLVED_IMPORT',
    'THIS_IS_UNDEFINED'
  ];

  if (!suppressed.find(code => message.code === code)) {
    return console.warn(message.message);
  }
}
