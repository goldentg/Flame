#!/usr/bin/env node

const stdin = process.stdin

stdin.resume() & stdin.setEncoding('utf8')

const arg = process.argv[2]
const eightball = require('./')()
const ask = () => output('please ask a question')
const output = (str) => process.stdout.write(str + '\n') && process.exit()
const check = (str) => (str && str.match(/\?\s*$/)) ? output(eightball) : ask()

if (stdin.isTTY) check(arg)

stdin.on('data', check)
