module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            "@components": ["./src/components"],
            "@app": ["./src/app"],
            "@screens": ["./src/screens"],
            "@context": ["./src/context"]
            }
          }
    ]
  ]
}
