# IDX Timing Adjuster &#127909;

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Introduction

I made this tool to address the issue of mismatched timing in VobSub subtitles with videos. Limitations in popular subtitle editors made it impossible to open the idx files, and adjusting timings manually would take a very long time.

This solution allows you to adjust all subtitle timings in an idx file.
This is useful if you have subtitles in .idx & .sub format, but the timings of all subtitles are shifted uniformly, which I found is often the case.

## Limitations

You only have the option to adjust all the timings at once by the same offset, so this will only be useful in cases where all timings are off by the same amount.

## Installation

Step-by-step instructions on how to get the development environment running.

```bash
git clone https://github.com/yarrumevets/idxtiming.git
cd idxtiming
yarn
```

## Usage

```bash
node server.js
```

Go to `http://localhost:3838` in your browser.

- Choose an idx file.
- Provide an offset (in miliseconds).
- Upload.
- A converted file will download automatically.

## License

Distributed under the MIT License. See the LICENSE file for more information.
