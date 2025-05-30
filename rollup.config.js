import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { visualizer } from 'rollup-plugin-visualizer';

const terserOptions = {
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ['console.log', 'console.warn'],
    passes: 3,
    dead_code: true,
    unsafe: true,
    unsafe_arrows: true,
    unsafe_comps: true,
    unsafe_Function: true,
    unsafe_math: true,
    unsafe_methods: true,
    unsafe_proto: true,
    unsafe_regexp: true,
    unsafe_undefined: true,
    toplevel: true
  },
  mangle: {
    properties: {
      regex: /^_/
    },
    toplevel: true
  },
  format: {
    comments: false,
    beautify: false
  }
};

export default [
  // ESM build (modern browsers)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/knowder.esm.js',
      format: 'esm',
      sourcemap: false
    },
    plugins: [
      nodeResolve(),
      terser(terserOptions),
      visualizer({
        filename: 'dist/stats.html',
        open: true
      })
    ]
  },
  // UMD build (universal compatibility)
  {
    input: 'src/index.js',
    output: {
      file: 'dist/knowder.umd.js',
      format: 'umd',
      name: 'Knowder',
      sourcemap: false
    },
    plugins: [
      nodeResolve(),
      getBabelOutputPlugin({
        allowAllFormats: true,
        presets: [
          ['@babel/preset-env', { 
            targets: {
              browsers: ['Chrome >= 88', 'Firefox >= 78', 'Safari >= 14', 'Edge >= 88']
            },
            modules: false,
            loose: true
          }]
        ],
        plugins: [
          ['@babel/plugin-transform-runtime', {
            corejs: false,
            helpers: true,
            regenerator: false,
            useESModules: true
          }]
        ]
      }),
      terser(terserOptions),
      visualizer({
        filename: 'dist/stats-umd.html',
        open: true
      })
    ]
  }
]; 