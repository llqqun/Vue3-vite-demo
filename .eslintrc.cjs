module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json',
  ],
  parser: 'vue-eslint-parser', // 解析器,解析.vue文件
  parserOptions: {
    parser: '@typescript-eslint/parser', // 解析器,解析script标签内容
    ecmaVersion: 'latest',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', 'prettier', '@typescript-eslint'],
  overrides: [],
  rules: {
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['home', 'layout'],
      },
    ],
    semi: ['warn', 'always'], // 尾部使用分号
    // 'no-undef': 'off',
    'no-console': 'warn', // 禁止出现console
    'no-duplicate-case': 'warn', // 禁止出现重复case
    'no-empty': 'warn', // 禁止出现空语句块
    'no-redeclare': 'warn', // 禁止多次声明同一变量
    'no-useless-catch': 'warn', // 禁止不必要的catch子句
    'no-useless-return': 'warn', // 禁止不必要的return语句
    'no-var': 'warn', // 禁止出现var用let和const代替
    eqeqeq: 'warn', // 要求使用 === 和 !==
    curly: 'warn', // 要求所有控制语句使用一致的括号风格
    'space-before-blocks': 'warn', // 要求在块之前使用一致的空格
    'space-in-parens': 'warn', // 要求在圆括号内使用一致的空格
    'space-infix-ops': 'warn', // 要求操作符周围有空格
    'space-unary-ops': 'warn', // 要求在一元操作符前后使用一致的空格
    'switch-colon-spacing': 'warn', // 要求在switch的冒号左右有空格
    'arrow-spacing': 'warn', // 要求箭头函数的箭头前后使用一致的空格
    'array-bracket-spacing': 'warn', // 要求数组方括号中使用一致的空格
    'brace-style': 'warn', // 要求在代码块中使用一致的大括号风格
    'max-depth': ['warn', 4], // 要求可嵌套的块的最大深度4
    'max-nested-callbacks': ['warn', 3], // 要求回调函数最大嵌套深度3
    quotes: ['warn', 'single', 'avoid-escape'], // 要求统一使用单引号符号
    'vue/require-default-prop': 0, // 关闭属性参数必须默认值
    'vue/singleline-html-element-content-newline': 0, // 关闭单行元素必须换行符
    'vue/multiline-html-element-content-newline': 0, // 关闭多行元素必须换行符
  },
};
